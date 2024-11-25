import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthInterceptorService } from './app/interceptors/auth-interceptor.service';

bootstrapApplication(AppComponent, {
  providers: [
    // Ajoute HttpClient avec support des intercepteurs
    provideHttpClient(withInterceptorsFromDi()),

    // Ajoute les routes si vous avez un routeur
    provideRouter(routes),

    // Importe FormsModule pour ngModel
    importProvidersFrom(FormsModule),
  ],
}).catch((err) => console.error(err));
