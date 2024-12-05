import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts'; // Import ScaleType
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-progress-chart',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './progress-chart.component.html',
  styleUrls: ['./progress-chart.component.css'],
})
export class ProgressChartComponent implements OnInit {
  pieChartData: any[] = [];
  barChartData: any[] = [];
  view: [number, number] = [700, 400];

  colorScheme = {
    domain: ['#4caf50', '#e0e0e0'],
    name: 'customScheme',
    selectable: true,
    group: ScaleType.Ordinal, // Use ScaleType.Ordinal instead of string
  };

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.habitService.getProgressStatistics().subscribe((data) => {
      this.pieChartData = [
        { name: 'Complétées', value: data.completedHabits },
        { name: 'Restantes', value: data.remainingHabits },
      ];
      this.barChartData = [
        { name: 'Complétées', value: data.completedHabits },
        { name: 'Restantes', value: data.remainingHabits },
      ];
    });
  }
}
