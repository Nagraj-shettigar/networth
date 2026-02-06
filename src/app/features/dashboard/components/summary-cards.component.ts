import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MarketDataService, MarketAsset } from '../../../core/services/market-data.service';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-cards">

      <div class="card highlight" *ngIf="nifty$ | async as nifty">
        <div class="title">NIFTY 50</div>
        <div class="value">₹{{ nifty.value | number:'1.2-2' }}</div>
        <div class="change" [ngClass]="{ positive: nifty.change >= 0, negative: nifty.change < 0 }">
          {{ nifty.changePercent | number:'1.2-2' }}%
        </div>
      </div>

      <div class="card" *ngIf="silver$ | async as silver">
        <div class="title">SILVER ETF</div>
        <div class="value">₹{{ silver.value | number:'1.2-2' }}</div>
        <div class="change" [ngClass]="{ positive: silver.change >= 0, negative: silver.change < 0 }">
          {{ silver.changePercent | number:'1.2-2' }}%
        </div>
      </div>

    </div>
  `,
  styleUrls: ['./summary-cards.component.css']
})
export class SummaryCardsComponent {
  nifty$: Observable<MarketAsset>;
  silver$: Observable<MarketAsset>;

  constructor(private marketData: MarketDataService) {
    this.nifty$ = this.marketData.getAssetBySymbol('%5ENSEI', 'NIFTY 50');
    this.silver$ = this.marketData.getAssetBySymbol('SILVERBEES.NS', 'Silver ETF');
  }
}
