import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private apiUrl = 'http://localhost:8080/api/habits'; // Base URL de l'API backend

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Génère les headers avec le token d'authentification
   */
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

  /**
   * Récupérer les statistiques des habitudes
   */
  getHabitStatistics(): Observable<any> {
    console.log('Requête envoyée : GET /statistics');
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/statistics`, { headers });
  }

  /**
   * Récupérer les habitudes actives uniquement
   */
  getActiveHabits(): Observable<any> {
    console.log('Requête envoyée : GET /habits?active=true');
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}?active=true`, { headers });
  }

  /**
   * Récupérer les habitudes filtrées
   * @param isActive Statut de l'habitude (true/false)
   * @param frequency Fréquence de l'habitude (quotidienne, hebdomadaire, etc.)
   */
  getFilteredHabits(isActive?: boolean | null, frequency?: string | null): Observable<any> {
    const params: any = {}; // Préparer les paramètres
    if (isActive !== null && isActive !== undefined) params.isActive = isActive;
    if (frequency) params.frequency = frequency;
  
    console.log('Requête envoyée avec paramètres :', params); // Ajout de logs
    const headers = this.getAuthHeaders(); // Inclure le token JWT dans les headers
    return this.http.get(`${this.apiUrl}/filtered`, { headers, params });
  }
  

  /**
   * Récupérer une habitude par ID
   * @param id Identifiant de l'habitude
   */
  getHabitById(id: number): Observable<any> {
    console.log(`Requête envoyée pour récupérer l'habitude avec ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Créer une nouvelle habitude
   * @param habit Données de l'habitude
   */
  createHabit(habit: any): Observable<any> {
    console.log('Requête pour créer une habitude :', habit);
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}`, habit, { headers });
  }

  /**
   * Mettre à jour une habitude existante
   * @param habit Données mises à jour de l'habitude
   */
  updateHabit(habit: any): Observable<any> {
    console.log('Requête pour mettre à jour une habitude :', habit);
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${habit.id}`, habit, { headers });
  }

  /**
   * Supprimer une habitude par ID
   * @param id Identifiant de l'habitude
   */
  deleteHabit(id: number): Observable<any> {
    console.log(`Requête pour supprimer une habitude avec ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  /**
   * Marquer une habitude comme complétée
   * @param id Identifiant de l'habitude
   */
  markHabitAsCompleted(id: number): Observable<any> {
    console.log(`Requête pour marquer une habitude comme complétée, ID : ${id}`);
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}/complete`, null, { headers });
  }

  /**
 * Récupérer les statistiques de progression (habitudes complétées/restantes)
 */
getProgressStatistics(): Observable<{ completedHabits: number; remainingHabits: number }> {
  console.log('Requête envoyée : GET /progress-statistics');
  const headers = this.getAuthHeaders(); // Inclure le token d'authentification
  return this.http.get<{ completedHabits: number; remainingHabits: number }>(
    `${this.apiUrl}/progress-statistics`, 
    { headers }
  );
}

}
