import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-progress-chart',
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css'],
})
export class ProgressChartComponent implements OnInit {
  ngOnInit() {
    new Chart('progressChart', {
      type: 'doughnut',
      data: {
        labels: ['Complétées', 'Restantes'],
        datasets: [
          {
            data: [70, 30], // Exemple de données
            backgroundColor: ['#4caf50', '#e0e0e0'],
          },
        ],
      },
    });
  }
}
