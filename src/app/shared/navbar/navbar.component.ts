import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HabitService } from '../../services/habit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string | null = '';
  unreadNotifications: number = 0;

  constructor(private authService: AuthService, private habitService: HabitService) {
    this.username = this.authService.getUsername();
    this.loadUnreadNotifications();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {
    this.authService.logout();
    window.location.href = '/signin';
  }

  // Charger le nombre de notifications non lues
  loadUnreadNotifications() {
    this.habitService.getPendingNotifications().subscribe(
      (data) => {
        this.unreadNotifications = data.length;
      },
      (error) => {
        console.error('Erreur lors de la récupération des notifications :', error);
      }
    );
  }
}
