import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css'],
})
export class HabitListComponent implements OnInit {
  habits: any[] = [];
  archivedHabits: any[] = [];
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
        console.log('Données reçues du backend :', data);
        this.habits = data;
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

  updateStreak(id: number): void {
    this.habitService.updateHabitStreak(id).subscribe(
      (data) => {
        alert('Streak mis à jour avec succès!');
        this.getHabits(); // Recharge les habitudes
        window.location.reload();
      },
      (error) => {
        console.error("Erreur lors de la mise à jour du streak :", error);
        alert("Impossible de mettre à jour le streak.");
      }
    );
  }

  toggleStatus(id: number): void {
    this.habitService.toggleHabitStatus(id).subscribe(
      (updatedHabit) => {
        alert(`L'état de l'habitude a été mis à jour : ${updatedHabit.active ? 'Actif' : 'Inactif'}`);
        this.getHabits(); // Recharge les habitudes pour mettre à jour la liste
      },
      (error) => {
        console.error("Erreur lors de la mise à jour de l'état de l'habitude :", error);
        alert("Impossible de mettre à jour l'état de l'habitude.");
      }
    );
  }
}
