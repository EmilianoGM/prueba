import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { Subscription } from 'rxjs';
import { ICursada } from 'src/app/clases/cursada';
import { IMateria } from 'src/app/clases/materia';
import { IUsuario } from 'src/app/clases/usuario';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';
import { ListaMateriasComponent }from '../../components/lista-materias/lista-materias.component';

@Component({
  selector: 'app-mostrar-materias',
  templateUrl: './mostrar-materias.component.html',
  styleUrls: ['./mostrar-materias.component.scss']
})
export class MostrarMateriasComponent implements OnInit {
  materia: IMateria;
  hayMateria: boolean = false;
  listaCursada: ICursada[];
  listaAlumnos: IUsuario[] = [];

  constructor(
    private cloudService: CloudStorageService
  ) { }

  ngOnInit(): void {
  }

  async mostrarAlumnos(value: IMateria){
    this.hayMateria = true;
    this.materia = value;
    let observable: Subscription;
    const terminado = await new Promise<boolean>((resolve, reject) => {
      observable = this.cloudService.getColeccionAlumnosMateria(value).valueChanges().subscribe((data) => {
        this.listaAlumnos = [];
        data.forEach((cursada) => {
          let alumno: IUsuario = {
            correo: cursada.mailAlumno,
            tipo: "alumno"
          }
          this.listaAlumnos.push(alumno);
        });
        resolve(true);
      });
    });
    if(terminado == true || terminado == false){
      console.log("TERMINADO", terminado);
      observable.unsubscribe();
    }
  }

}
