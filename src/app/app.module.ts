import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component'; 
import { FooterComponent } from './shared/footer/footer.component'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NavbarComponent, // Ajoute le composant standalone ici
    FooterComponent  // Ajoute le composant standalone ici
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
