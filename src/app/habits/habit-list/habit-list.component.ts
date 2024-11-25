import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Requis pour les directives Angular
import { FormsModule } from '@angular/forms'; // Requis pour [(ngModel)]
import { RouterModule } from '@angular/router'; // Requis pour [routerLink]
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // Ajouter les modules nécessaires
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css'],
})
export class HabitListComponent implements OnInit {
  habits: any[] = [];
  isActive: boolean | null = null;
  frequency: string | null = null;

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.getHabits();
  }

  getHabits(): void {
    // Ajout de logs pour vérifier les paramètres envoyés
    console.log('Paramètres des filtres :', { isActive: this.isActive, frequency: this.frequency });
  
    this.habitService.getFilteredHabits(this.isActive, this.frequency).subscribe(
      (data) => {
        console.log('Données reçues :', data);
        this.habits = data as any[];
      },
      (error) => {
        console.error("Erreur lors de la récupération des habitudes :", error);
        alert("Erreur lors du chargement des données.");
      }
    );
  }
  

  deleteHabit(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette habitude ?')) {
      this.habitService.deleteHabit(id).subscribe(() => this.getHabits());
    }
  }
}
