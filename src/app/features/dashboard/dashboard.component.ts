import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-layout">
      <app-summary-cards></app-summary-cards>
      <app-portfolio-chart></app-portfolio-chart>
      <app-asset-list></app-asset-list>
    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {}
