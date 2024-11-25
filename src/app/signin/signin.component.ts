import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignin() {
    const user = {
      username: this.username,
      password: this.password,
    };
  
    this.authService.signin(user).subscribe({
      next: (response) => {
        console.log('Réponse de l\'API :', response);
  
        // Sauvegarder le token et rediriger
        if (response.token) {
          this.authService.saveUserDetails(response.token, user.username);
          const savedToken = this.authService.getToken();
          if (savedToken) {
            console.log('Token correctement sauvegardé :', savedToken);
            this.router.navigate(['/dashboard']);
          } else {
            this.message = "Erreur : Le token n'a pas été sauvegardé correctement.";
          }
        } else {
          this.message = "Erreur : Aucun token reçu de l'API.";
        }
      },
      error: (err) => {
        console.error('Erreur d\'authentification :', err);
        if (err.error && err.error.message) {
          this.message = `Erreur : ${err.error.message}`;
        } else {
          this.message = "Erreur : Nom d'utilisateur ou mot de passe incorrect !";
        }
      },
    });
  }
  
}
