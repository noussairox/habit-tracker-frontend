import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private apiUrl = 'http://localhost:8080/api/habits';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken(); // Récupère le token depuis le AuthService
    if (token) {
      console.log('Ajout du token dans les headers :', token);
      return new HttpHeaders({ Authorization: `Bearer ${token}` });
    } else {
      console.warn('Aucun token trouvé dans AuthService.');
      return new HttpHeaders();
    }
  }

  getHabitStatistics(): Observable<any> {
    console.log('Requête envoyée : GET /statistics');
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/statistics`, { headers });
  }

  getActiveHabits(): Observable<any> {
    console.log('Requête envoyée : GET /habits?active=true');
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}?active=true`, { headers });
  }

  getFilteredHabits(isActive?: boolean | null, frequency?: string | null): Observable<any> {
    let params: any = {};
    if (isActive !== null) params.isActive = isActive;
    if (frequency) params.frequency = frequency;

    console.log('Requête filtrée envoyée avec paramètres :', params);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers, params });
  }

  getHabitById(id: number): Observable<any> {
    console.log(`Requête envoyée pour récupérer l'habitude avec ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  createHabit(habit: any): Observable<any> {
    console.log('Requête pour créer une habitude :', habit);
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}`, habit, { headers });
  }

  updateHabit(habit: any): Observable<any> {
    console.log('Requête pour mettre à jour une habitude :', habit);
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${habit.id}`, habit, { headers });
  }

  deleteHabit(id: number): Observable<any> {
    console.log(`Requête pour supprimer une habitude avec ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  markHabitAsCompleted(id: number): Observable<any> {
    console.log(`Requête pour marquer une habitude comme complétée, ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/complete/${id}`, null, { headers });
  }
}
