import { Component, OnInit } from '@angular/core';
import { Subscribable, Subscription } from 'rxjs';
import { ICursada } from 'src/app/clases/cursada';
import { IMateria } from 'src/app/clases/materia';
import { IUsuario } from 'src/app/clases/usuario';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';

@Component({
  selector: 'app-inscripcion-materia',
  templateUrl: './inscripcion-materia.component.html',
  styleUrls: ['./inscripcion-materia.component.scss']
})
export class InscripcionMateriaComponent implements OnInit {
  materia: IMateria;
  hayMateria: boolean = false;
  listaCursada: ICursada[];
  listaAlumnosNoEnMateria: IUsuario[] = [];
  listaAlumnos: IUsuario[] = []
  constructor(
    private cloudService: CloudStorageService
  ){
    this.cloudService.getListaAlumnos().subscribe((data) => {
      this.listaAlumnos = data;
      console.log("lista alumnos", this.listaAlumnos);
    })
  }

  ngOnInit(): void {
  }

  async mostrarAlumnos(value: IMateria){
    this.hayMateria = true;
    this.materia = value;
    if(value.alumnos){
      let observable: Subscription;
      const terminado = await new Promise<boolean>((resolve, reject) => {
        observable = this.cloudService.getColeccionAlumnosMateria(value).valueChanges().subscribe((data) => {
          this.listaAlumnosNoEnMateria = [];
          this.listaCursada = data;
          let nuevaLista: IUsuario[] = [];
          for (let index = 0; index < this.listaAlumnos.length; index++) {
            let alumno: IUsuario = this.listaAlumnos[index];

            let bandera = true;
            for (let i = 0; i < data.length; i++) {
              if(alumno.correo == data[i].mailAlumno){
                bandera = false;
                break;
              }
            }
            if(bandera){
              nuevaLista.push(alumno);
            }
          }
          this.listaAlumnosNoEnMateria = nuevaLista;
          resolve(true);
        });
      });
      if(terminado == true || terminado == false){
        observable.unsubscribe();
      }
    } else {
      this.listaAlumnosNoEnMateria = this.listaAlumnos;
    }
  }

  sumarAlumnoAMateria(value: IUsuario){
    if(this.hayMateria){
      this.cloudService.cargarCursada(value.correo, this.materia);
      for (let index = 0; index < this.listaAlumnosNoEnMateria.length; index++) {
        if(this.listaAlumnosNoEnMateria[index].correo == value.correo){
          this.listaAlumnosNoEnMateria.splice(index);
          break;
        }
      }
    }
  }

}
