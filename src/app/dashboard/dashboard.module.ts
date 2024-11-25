import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ActiveHabitsComponent } from './active-habits/active-habits.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,         // Composant principal du Dashboard
    SummaryComponent,           // Résumé des statistiques
    ActiveHabitsComponent,      // Liste des habitudes actives
    ProgressChartComponent,     // Graphique de progression
  ],
  imports: [
    CommonModule,               // Pour les directives Angular courantes
    DashboardRoutingModule      // Routage spécifique au Dashboard
  ],
})
export class DashboardModule {}
