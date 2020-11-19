import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire'
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
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
    MostrarMateriasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
