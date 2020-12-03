import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MenuComponent } from './components/menu/menu.component';
import { EmailComponent } from './components/email/email.component';
import { AdminRegisterFormComponent } from './components/admin-register-form/admin-register-form.component';
import { AdminRegisterComponent } from './pages/admin-register/admin-register.component';
import { MateriaRegisterFormComponent } from './components/materia-register-form/materia-register-form.component';
import { MateriaRegisterComponent } from './pages/materia-register/materia-register.component';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';
import { ListaMateriasComponent } from './components/lista-materias/lista-materias.component';
import { MostrarMateriasComponent } from './pages/mostrar-materias/mostrar-materias.component';
import { InscripcionMateriaComponent } from './pages/inscripcion-materia/inscripcion-materia.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { MostrarUsuariosComponent } from './pages/mostrar-usuarios/mostrar-usuarios.component';
import { TipoPipe } from './pipes/tipo.pipe';
import { IncribirCursadaComponent } from './pages/incribir-cursada/incribir-cursada.component';
import { MostrarMateriasAlumnoComponent } from './pages/mostrar-materias-alumno/mostrar-materias-alumno.component';
import { MostrarMateriasProfesorComponent } from './pages/mostrar-materias-profesor/mostrar-materias-profesor.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginFormComponent,
    MenuComponent,
    EmailComponent,
    AdminRegisterFormComponent,
    AdminRegisterComponent,
    MateriaRegisterFormComponent,
    MateriaRegisterComponent,
    ListaProfesoresComponent,
    ListaMateriasComponent,
    MostrarMateriasComponent,
    InscripcionMateriaComponent,
    ListaAlumnosComponent,
    ListaUsuariosComponent,
    MostrarUsuariosComponent,
    TipoPipe,
    IncribirCursadaComponent,
    MostrarMateriasAlumnoComponent,
    MostrarMateriasProfesorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
