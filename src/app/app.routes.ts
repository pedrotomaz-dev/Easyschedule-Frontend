import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { FullScheduleComponent } from './features/full-schedule/full-schedule.component';
import { ServiceListComponent } from './features/service-list/service-list.component';
import { ServiceListFormComponent } from './features/service-list/service-list-form/service-list-form.component';
import { ProfessionalListComponent } from './features/professional-list/professional-list.component';
import { ProfessionalFormComponent } from './features/professional-list/professional-form/professional-form.component';
import { LoginComponent } from './features/login/login.component';
import { authGuard } from './core/guards/auth.guard';
import { AutoRegisterComponent } from './features/auto-register/auto-register.component';
import { SchedulingComponent } from './features/scheduling/scheduling.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'scheduling', component: SchedulingComponent },
  { path: 'autoRegister', component: AutoRegisterComponent },

  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'fullSchedule', component: FullScheduleComponent },
      { path: 'serviceList', component: ServiceListComponent },
      { path: 'serviceList/:id', component: ServiceListFormComponent },
      { path: 'professionalList', component: ProfessionalListComponent },
      { path: 'professionalList/:id', component: ProfessionalFormComponent },
    ]
  },

  // Redirecionamento para caminhos desconhecidos
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

