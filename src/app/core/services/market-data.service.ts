import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface MarketAsset {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

@Injectable({ providedIn: 'root' })
export class MarketDataService {
  private baseUrl = 'http://localhost:3001/api';

  constructor(private http: HttpClient) {}

  /* ===========================
     Autocomplete search
  ============================ */
  searchAssets(query: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/search?q=${encodeURIComponent(query)}`
    );
  }

  /* ===========================
     Fetch asset by symbol
  ============================ */
  getAssetBySymbol(symbol: string, displayName: string): Observable<MarketAsset> {
    return this.http
      .get<any>(`${this.baseUrl}/asset/${encodeURIComponent(symbol)}`)
      .pipe(map(res => this.mapYahoo(res, displayName)));
  }

  /* ===========================
     Normalizer
  ============================ */
  private mapYahoo(res: any, name: string): MarketAsset {
    const meta = res.chart.result[0].meta;
    const price = meta.regularMarketPrice;
    const prev = meta.chartPreviousClose;

    const change = price - prev;
    const changePercent = (change / prev) * 100;

    return {
      name,
      value: price,
      change,
      changePercent
    };
  }
}
