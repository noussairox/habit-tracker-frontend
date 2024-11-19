import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Vérifiez l'import de HttpClient
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {} // Injecter HttpClient

  // Méthodes pour s'inscrire et se connecter
  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  signin(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, user);
  }

  // Gestion du token JWT
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }
  saveUserDetails(token: string, username: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  }
  
  getUsername(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('username');
    }
    return null;
  }
  

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }
}
