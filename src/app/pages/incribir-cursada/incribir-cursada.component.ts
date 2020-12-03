import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICursada } from 'src/app/clases/cursada';
import { IMateria } from 'src/app/clases/materia';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-incribir-cursada',
  templateUrl: './incribir-cursada.component.html',
  styleUrls: ['./incribir-cursada.component.scss']
})
export class IncribirCursadaComponent implements OnInit {
  listaMaterias: IMateria[] = [];
  listaMostrar: IMateria[] = [];
  listaCursadas: ICursada[] = [];
  correo: string;
  constructor(
    private cloudStorage: CloudStorageService,
    private tokenService: TokenService
  ) {
    let token = this.tokenService.getToken();
    this.correo = token.email;
    this.cargarCursadas().then((data) => {
      this.cargarMaterias().then((result) => {
        if(this.listaCursadas.length > 0){
          for (let index = 0; index < this.listaMaterias.length; index++) {
            let bandera = true;
            let materia: IMateria = this.listaMaterias[index];
            for (let i = 0; i < this.listaCursadas.length; i++) {
              if(this.listaCursadas[i].nombreMateria == materia.nombre){
                bandera = false;
              }
            }
            if(bandera){
              this.listaMostrar.push(materia);
            }
          }
        } else {
          this.listaMostrar = this.listaMaterias;
        }
      });
    });
  }

  ngOnInit(): void {
  }

  async cargarCursadas(): Promise<boolean>{
    let observable: Subscription;
    const terminado = await new Promise<boolean>((resolve, reject) => {
      observable = this.cloudStorage.coleccionCursadas.valueChanges().subscribe((lista) => {
        this.listaCursadas = [];
        for (let index = 0; index < lista.length; index++) {
          if(lista[index].mailAlumno == this.correo){
            this.listaCursadas.push(lista[index]);
          }
        }
        resolve(true);
      });
    });
    if(terminado == true || terminado == false){
        observable.unsubscribe();
        return terminado;
    }
  }

  async cargarMaterias(): Promise<boolean>{
    let observable: Subscription;
    const terminado = await new Promise<boolean>((resolve, reject) => {
      observable = this.cloudStorage.coleccionMaterias.valueChanges().subscribe((lista) => {
        this.listaMaterias = lista;
        resolve(true);
      });
    });
    if(terminado == true || terminado == false){
        observable.unsubscribe();
        return terminado;
    }
  }

  sumarAlumnoAMateria(value: IMateria){
      this.cloudStorage.cargarCursada(this.correo, value);
      for (let index = 0; index < this.listaMostrar.length; index++) {
        if(this.listaMostrar[index].nombre == value.nombre){
          this.listaMostrar.splice(index);
          break;
        }
      }
  }
}
