import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService,private router:Router) {}

  onSignup() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.signup(user).subscribe(
      (response) => {
        this.message = response.message;
        this.router.navigate(['/signin']);
      },
      (error) => {
        this.message = "Erreur lors de l'inscription";
      }
    );
  }
}
