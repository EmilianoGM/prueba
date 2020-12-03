import { Component, OnInit } from '@angular/core';
import { MateriaRegisterFormComponent } from '../../components/materia-register-form/materia-register-form.component';
import { CloudStorageService  } from '../../services/cloud-storage.service';
import { Router} from '@angular/router';
import { IMateria } from 'src/app/clases/materia';
@Component({
  selector: 'app-materia-register',
  templateUrl: './materia-register.component.html',
  styleUrls: ['./materia-register.component.scss']
})
export class MateriaRegisterComponent implements OnInit {
  profesorAgregado: boolean = false;
  mailProfesor: string;
  mensaje: string = "Debe seleccionar un profesor de la lista para poder agregar la materia.";
  constructor(
    private router: Router,
    private cloudStorageService: CloudStorageService
  ) {
    console.log("EN MATERIA REGISTER");
   }

  ngOnInit(): void {
  }

  public registrarMateria(value){
    console.log("mail",this.mailProfesor);
    if(this.profesorAgregado){
      let nuevaMateria: IMateria = {
        cupo: value.cupo,
        profesor: this.mailProfesor,
        nombre: value.nombre,
        cuatrimestre: value.cuatrimestre,
        year: value.year,
        alumnos: false
      }
      console.log("Formulario registro materia:", value);
      console.log("Materia a enviar", nuevaMateria);
      this.cloudStorageService.cargarMateria(nuevaMateria);
    }
    //this.router.navigateByUrl('/mostrar-materias');
    /*
    this.fireAuthService.registrarUsuario(value)
      .then((res) => {
        this.router.navigateByUrl("/login");
      }, (err) => {
        console.log("ERROR al registrarse", err);
      });
    */
  }

  public agregarProfesor(value){
    if(value.bandera){
      console.log("Data en page", value);
      this.profesorAgregado = value.bandera;
      this.mailProfesor = value.email;
      this.mensaje = "Profesor agregado";
    }
  }
}
