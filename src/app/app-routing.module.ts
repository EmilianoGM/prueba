import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { MateriaRegisterComponent } from './pages/materia-register/materia-register.component';
import { MostrarMateriasComponent } from './pages/mostrar-materias/mostrar-materias.component';

import{ AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin-register',
    component: AdminRegisterComponent
  },
  {
    path: 'materia-register',
    component: MateriaRegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'mostrar-materias',
    component: MostrarMateriasComponent,
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
