import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { HabitListComponent } from './habits/habit-list/habit-list.component';
import { HabitFormComponent } from './habits/habit-form/habit-form.component';

export const routes: Routes = [
  // Routes publiques
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'homePage',component: HomeComponent },
  


  // Routes protégées
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] },
  { path: 'habits', component: HabitListComponent, canActivate: [AuthGuard] },
  { path: 'habits/add', component: HabitFormComponent, canActivate: [AuthGuard] },
  { path: 'habits/edit/:id', component: HabitFormComponent, canActivate: [AuthGuard] },
  // Redirections
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/signin' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
