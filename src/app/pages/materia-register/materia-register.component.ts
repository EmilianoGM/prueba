import { Component, OnInit } from '@angular/core';
import { MateriaRegisterFormComponent } from '../../components/materia-register-form/materia-register-form.component';
import { CloudStorageService  } from '../../services/cloud-storage.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-materia-register',
  templateUrl: './materia-register.component.html',
  styleUrls: ['./materia-register.component.scss']
})
export class MateriaRegisterComponent implements OnInit {

  constructor(
    private router: Router,
    private cloudStorageService: CloudStorageService
  ) { }

  ngOnInit(): void {
  }

  public registrarMateria(value){
    console.log("Formulario registro materia:", value);
    this.cloudStorageService.cargarMateria(value);
    this.router.navigateByUrl('/mostrar-materias');
    /*
    this.fireAuthService.registrarUsuario(value)
      .then((res) => {
        this.router.navigateByUrl("/login");
      }, (err) => {
        console.log("ERROR al registrarse", err);
      });
    */
  }
}
