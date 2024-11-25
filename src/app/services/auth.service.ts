import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth'; // URL de l'API d'authentification
  private tokenKey = 'token'; // Clé utilisée pour stocker le token dans localStorage
  private usernameKey = 'username'; // Clé pour stocker le nom d'utilisateur

  constructor(private http: HttpClient) {}

  // **Inscription**
  signup(user: any): Observable<any> {
    console.log('Envoi de la requête d\'inscription :', user);
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // **Connexion**
  signin(user: any): Observable<any> {
    console.log('Envoi de la requête de connexion :', user);
    return this.http.post(`${this.apiUrl}/signin`, user);
  }

  // **Sauvegarde du token JWT dans localStorage**
  saveToken(token: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      console.log('Token JWT sauvegardé dans localStorage :', token);
    } else {
      console.error('localStorage n\'est pas disponible dans cet environnement.');
    }
  }

  // **Récupération du token depuis localStorage**
  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem(this.tokenKey);
      console.log('Token récupéré depuis localStorage :', token);
      return token;
    }
    console.warn('localStorage n\'est pas disponible.');
    return null;
  }

  // **Sauvegarde des détails utilisateur (token et nom d'utilisateur)**
  saveUserDetails(token: string, username: string): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.usernameKey, username);
      console.log('Détails utilisateur sauvegardés :', { token, username });
    } else {
      console.error('localStorage n\'est pas disponible dans cet environnement.');
    }
  }

  // **Récupération du nom d'utilisateur**
  getUsername(): string | null {
    if (typeof localStorage !== 'undefined') {
      const username = localStorage.getItem(this.usernameKey);
      console.log('Nom d\'utilisateur récupéré :', username);
      return username;
    }
    console.warn('localStorage n\'est pas disponible.');
    return null;
  }

  // **Vérifie si l'utilisateur est authentifié (token valide)**
  isAuthenticated(): boolean {
    const token = this.getToken();
    console.log('Authentification vérifiée. Utilisateur connecté :', !!token);
    return !!token;
  }

  // **Déconnexion : suppression du token et des détails utilisateur**
  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.usernameKey);
      console.log('Déconnexion effectuée : token et données utilisateur supprimés.');
    } else {
      console.error('localStorage n\'est pas disponible.');
    }
  }
}
