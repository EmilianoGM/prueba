import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IUsuario } from 'src/app/clases/usuario';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {
  @Output() emitAlumno = new EventEmitter<any>();

  @Input() lista: IUsuario[];
  @Input() activarAcciones: boolean;

  constructor(
    private cloudService: CloudStorageService
  ) {
  }

  ngOnInit(): void {
  }

  public enviarAlumno(alumno: IUsuario){
    this.emitAlumno.emit(alumno);
  }

}
