import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,               // Nécessaire pour les directives Angular
    DashboardRoutingModule,     // Routage spécifique au Dashboard
  ],
})
export class DashboardModule {}
