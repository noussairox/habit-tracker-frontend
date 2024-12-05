import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Ajoutez RouterModule ici
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css'],
})
export class HabitListComponent implements OnInit {
  habits: any[] = [];
  active: boolean | null = null;
  frequency: string | null = null;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.getHabits();
  }

  getHabits(): void {
    console.log('Filtres appliqués :', { active: this.active, frequency: this.frequency });
  
    this.habitService.getFilteredHabits(this.active, this.frequency).subscribe(
      (data) => {
        console.log('Données reçues du backend :', data); // Log pour vérifier les résultats
        this.habits = data; // Mettre à jour la liste des habitudes
      },
      (error) => {
        console.error('Erreur lors de la récupération des données :', error);
        alert('Erreur lors du chargement des habitudes.');
      }
    );
  }
  
  
  

  deleteHabit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette habitude ?')) {
      this.habitService.deleteHabit(id).subscribe(() => this.getHabits());
    }
  }
}
