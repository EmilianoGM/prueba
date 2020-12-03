import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { MateriaRegisterComponent } from './pages/materia-register/materia-register.component';
import { MostrarMateriasComponent } from './pages/mostrar-materias/mostrar-materias.component';

import { AdminGuard } from './guards/admin.guard';
import{ AuthGuard } from './guards/auth.guard';
import { InscripcionMateriaComponent } from './pages/inscripcion-materia/inscripcion-materia.component';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';
import { from } from 'rxjs';
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
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'mostrar-materias',
    component: MostrarMateriasComponent,
  },
  {
    path: 'mostrar-usuarios',
    component: MostrarUsuariosComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'inscripcion-materia',
    component: InscripcionMateriaComponent,
    canActivate: [AuthGuard, AdminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
