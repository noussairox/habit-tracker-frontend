import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    FormsModule, // Toujours nécessaire pour ngModel si utilisé
  ],
  providers: [],
  bootstrap: [], // Vide si vous utilisez bootstrapApplication
})
export class AppModule {}
