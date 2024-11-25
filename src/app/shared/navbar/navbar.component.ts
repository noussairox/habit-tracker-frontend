import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common'; // Importer CommonModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule], // Ajouter CommonModule ici
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  username: string | null = '';

  constructor(private authService: AuthService) {
    this.username = this.authService.getUsername(); // Récupérer le nom d'utilisateur
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Vérifier l'authentification
  }

  logout() {
    this.authService.logout();
    window.location.href = '/signin'; // Redirection après déconnexion
  }
}
