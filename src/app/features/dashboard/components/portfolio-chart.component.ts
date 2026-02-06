import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-portfolio-chart',
  standalone: true,
  template: `
    <div class="portfolio-chart">
      <div class="chart-header">
        <h3>Portfolio Value Over Time</h3>
        <span class="subtitle">Last 6 months</span>
      </div>

      <canvas #chartCanvas></canvas>
    </div>
  `,
  styleUrls: ['./portfolio-chart.component.css']
})
export class PortfolioChartComponent implements AfterViewInit {

  @ViewChild('chartCanvas') canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  private renderChart(): void {
    new Chart(this.canvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Portfolio Value (₹)',
            data: [820000, 845000, 830000, 880000, 910000, 960000],
            fill: true,
            tension: 0.4,
            borderColor: '#4f46e5',
            backgroundColor: 'rgba(79,70,229,0.12)',
            pointRadius: 4,
            pointBackgroundColor: '#4f46e5'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: ctx => `₹${ctx.raw?.toLocaleString()}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            ticks: {
              callback: value => `₹${Number(value).toLocaleString('en-IN')}`
            },
            grid: {
              color: '#f1f5f9'
            }
          }
        }
      }
    });
  }
}
