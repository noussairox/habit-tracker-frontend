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
    isActive: true,
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
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.habitService.getHabitById(+id).subscribe(
        (data) => {
          this.habit = data;
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
      this.habitService.updateHabit(this.habit).subscribe(
        () => {
          alert('Habitude mise à jour avec succès!');
          this.router.navigate(['/habits']);
        },
        (error) => {
          console.error("Erreur lors de la mise à jour :", error);
          alert("Erreur lors de la mise à jour de l'habitude.");
        }
      );
    } else {
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
