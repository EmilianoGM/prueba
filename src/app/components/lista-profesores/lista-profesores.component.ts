import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloudStorageService } from '../../services/cloud-storage.service';
@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.scss']
})
export class ListaProfesoresComponent implements OnInit {
  @Output() emitProfesor = new EventEmitter<any>();

  lista = [];

  constructor(
    private cloudService: CloudStorageService
  ) {
    this.cloudService.getListaProfesores().subscribe((snap) =>{
      console.log("En lista");
      snap.forEach((user) => {
        this.lista.push(user);
      });
    });
  }

  ngOnInit(): void {
  }

  public enviarProfesor(correo: string){
    let nuevaData = {
      email: correo,
      bandera: true
    }
    console.log("NUEVA DATA", nuevaData);
    this.emitProfesor.emit(nuevaData);
  }
}
