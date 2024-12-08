import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import du CommonModule
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-habit-progress',
  standalone: true, // Composant autonome
  imports: [CommonModule], // Ajout du CommonModule
  templateUrl: './habit-progress.component.html',
  styleUrls: ['./habit-progress.component.css']
})
export class HabitProgressComponent implements OnInit {
  progressStatistics: any;
  archivedHabits: any[] = [];

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.getProgressStatistics();
    this.getArchivedHabits();
  }

  getProgressStatistics(): void {
    this.habitService.getProgressStatistics().subscribe(
      (data) => {
        this.progressStatistics = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des statistiques :", error);
        alert("Erreur lors du chargement des statistiques.");
      }
    );
  }

  getArchivedHabits(): void {
    this.habitService.getArchivedHabits().subscribe(
      (data) => {
        this.archivedHabits = data;
      },
      (error) => {
        console.error("Erreur lors de la récupération des habitudes archivées :", error);
        alert("Erreur lors du chargement des habitudes archivées.");
      }
    );
  }
}
