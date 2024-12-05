import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-habit-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './habit-form.component.html',
  styleUrls: ['./habit-form.component.css'],
})
export class HabitFormComponent implements OnInit {
  habit: any = {
    name: '',
    description: '',
    frequency: 'quotidienne',
    active: true,
    startDate: '',
    endDate: '',
    targetCount: 0,
  };

  isEditing: boolean = false;

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Récupère l'ID depuis l'URL
    if (id) {
      this.isEditing = true;
      console.log('Chargement de l\'habitude avec ID :', id); // Debugging
      this.habitService.getHabitById(+id).subscribe(
        (data) => {
          console.log('Habitude chargée :', data); // Vérifiez ce que le backend renvoie
          this.habit = {
            ...data, // Copie les valeurs reçues
            active: data.active, // S'assure que `active` est bien utilisé
          };
        },
        (error) => {
          console.error("Erreur lors de la récupération de l'habitude :", error);
          alert("Impossible de charger les données de l'habitude.");
        }
      );
    }
  }

  onSubmit(): void {
    if (this.isEditing) {
      console.log('Mise à jour de l\'habitude :', this.habit);
      this.habitService.updateHabit(this.habit).subscribe(
        () => {
          alert('Habitude mise à jour avec succès!');
          this.router.navigate(['/habits']);
        },
        (error) => {
          console.error('Erreur lors de la mise à jour :', error);
          alert('Erreur lors de la mise à jour de l\'habitude.');
        }
      );
    } else {
      console.log('Création d\'une nouvelle habitude :', this.habit);
      this.habitService.createHabit(this.habit).subscribe(
        () => {
          alert('Nouvelle habitude ajoutée avec succès!');
          this.router.navigate(['/habits']);
        },
        (error) => {
          console.error("Erreur lors de la création :", error);
          alert("Erreur lors de la création de l'habitude.");
        }
      );
    }
  }
}
