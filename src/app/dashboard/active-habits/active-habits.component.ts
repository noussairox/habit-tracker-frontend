import { Component, OnInit } from '@angular/core';
import { HabitService } from '../../services/habit.service';

@Component({
  selector: 'app-active-habits',
  templateUrl: './active-habits.component.html',
  styleUrls: ['./active-habits.component.css'],
})
export class ActiveHabitsComponent implements OnInit {
  activeHabits: any[] = [];

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.habitService.getActiveHabits().subscribe((data) => {
      this.activeHabits = data;
    });
  }
}
