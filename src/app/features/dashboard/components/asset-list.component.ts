import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MarketDataService } from '../../../core/services/market-data.service';

@Component({
  selector: 'app-asset-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="asset-list">

      <!-- Header -->
      <div class="asset-header">
        <h3>Your Assets</h3>
        <p>Add and track stocks, ETFs & indices</p>
      </div>

      <!-- Search -->
      <div class="asset-search">
        <input
          type="text"
          placeholder="Search NSE stock or ETF (e.g. HDFC, Tata)"
          [(ngModel)]="query"
          (input)="onSearch()"
        />

        <ul *ngIf="suggestions.length" class="autocomplete">
          <li
            *ngFor="let s of suggestions"
            (click)="selectSuggestion(s)"
          >
            <div class="name">{{ s.name }}</div>
            <div class="symbol">{{ s.symbol }}</div>
          </li>
        </ul>
      </div>

      <!-- Table -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Value</th>
              <th>Change</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let a of assets">
              <td class="asset-name">{{ a.name }}</td>
              <td class="asset-type">{{ a.type }}</td>
              <td class="asset-value">{{ a.value }}</td>
              <td
                class="asset-change"
                [ngClass]="{
                  positive: a.change > 0,
                  negative: a.change < 0
                }"
              >
                {{ a.change > 0 ? '+' : '' }}{{ a.change }}%
              </td>
            </tr>

            <tr *ngIf="!assets.length">
              <td colspan="4" class="empty">
                Start by searching and adding assets
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  `,
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent {

  query = '';
  suggestions: any[] = [];
  assets: any[] = [];

  constructor(private marketData: MarketDataService) {}

  onSearch(): void {
    if (this.query.length < 2) {
      this.suggestions = [];
      return;
    }

    this.marketData.searchAssets(this.query).subscribe(res => {
      this.suggestions = res;
    });
  }

  selectSuggestion(item: any): void {
    this.marketData
      .getAssetBySymbol(item.symbol, item.name)
      .subscribe(asset => {
        this.assets.unshift({
          name: asset.name,
          type: item.type,
          value: `₹${asset.value.toLocaleString('en-IN')}`,
          change: Number(asset.changePercent.toFixed(2))
        });
      });

    this.query = '';
    this.suggestions = [];
  }
}
