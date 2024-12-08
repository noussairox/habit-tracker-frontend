import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-summary',
  standalone: true, // Composant autonome
  imports: [CommonModule], // Import des dépendances nécessaires
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  stats = {
    totalHabits: 0,
    activeHabits: 0,
    inactiveHabits: 0,
    bestStreak: 0,
    archivedHabits: 0,
  };

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.habitService.getHabitStatistics().subscribe((data) => {
      this.stats = data;
    });
  }
}
