
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard.component';
import { SummaryCardsComponent } from './components/summary-cards.component';
import { AssetListComponent } from './components/asset-list.component';
import { PortfolioChartComponent } from './components/portfolio-chart.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AssetListComponent,
    SummaryCardsComponent,
    PortfolioChartComponent,
    RouterModule.forChild(routes)
  ],
  exports: [DashboardComponent]
})
export class DashboardModule {}
