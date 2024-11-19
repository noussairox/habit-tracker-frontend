import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignin() {
    const user = {
      username: this.username,
      password: this.password
    };
  
    this.authService.signin(user).subscribe(
      (response) => {
        console.log('Réponse de l\'API :', response); // Journal pour vérifier la réponse
  
        // Vérifiez et enregistrez le token
        if (response.token) {
          this.authService.saveUserDetails(response.token, user.username);
          console.log('Token récupéré après authentification:', response.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.message = "Erreur : Aucun token reçu de l'API.";
        }
      },
      (error) => {
        this.message = "Erreur : Nom d'utilisateur ou mot de passe incorrect !";
      }
    );  
  }
}
