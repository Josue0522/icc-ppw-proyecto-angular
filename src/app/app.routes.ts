import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { ProgrammerList } from './features/programmers/programmer-list/programmer-list';
import { ProgrammerDetail } from './features/programmers/programmer-detail/programmer-detail';
import { ProjectList } from './features/projects/project-list/project-list';
import { ProjectDetail } from './features/projects/project-detail/project-detail';
import { RequestForm } from './features/requests/request-form/request-form';
import { RequestList } from './features/requests/request-list/request-list';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Register },
  { path: 'programadores', component: ProgrammerList },
  { path: 'programadores/:slug', component: ProgrammerDetail },
  { path: 'proyectos', component: ProjectList },
  { path: 'proyectos/:slug', component: ProjectDetail },
  { path: 'solicitud', component: RequestForm },
  { path: 'solicitudes', component: RequestList },
  { path: '**', redirectTo: '' },
];