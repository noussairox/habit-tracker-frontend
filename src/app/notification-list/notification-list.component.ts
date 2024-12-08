import { Component, OnInit } from '@angular/core';
import { HabitService } from '../services/habit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css'],
})
export class NotificationListComponent implements OnInit {
  notifications: any[] = [];
  isLoading: boolean = true;

  constructor(private habitService: HabitService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  // Charger les notifications depuis le backend
  loadNotifications() {
    this.isLoading = true;
    this.habitService.getRecentNotifications().subscribe(
      (data) => {
        this.notifications = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications :', error);
        this.isLoading = false;
      }
    );
  }

  // Supprimer une notification
  deleteNotification(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette notification ?')) {
      this.habitService.deleteNotification(id).subscribe(
        (response) => {
          this.notifications = this.notifications.filter((n) => n.id !== id);
          alert(response.message); // Affiche le message de succès
        },
        (error) => {
          console.error('Erreur lors de la suppression de la notification :', error);
          alert(error.error?.error || 'Une erreur est survenue lors de la suppression.');
        }
      );
    }
  }
  
}
