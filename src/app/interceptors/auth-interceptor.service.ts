import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupère le token depuis le service d'authentification
    const token = this.authService.getToken();

    // Si le token existe, ajoute l'en-tête Authorization
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      console.log('Requête interceptée et modifiée avec token :', clonedReq);
      return next.handle(clonedReq); // Poursuit avec la requête modifiée
    }

    console.warn('Aucun token trouvé, envoi de la requête sans Authorization.');
    return next.handle(req); // Laisse passer les requêtes sans token
  }
}
