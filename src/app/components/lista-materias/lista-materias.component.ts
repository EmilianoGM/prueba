import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IMateria } from 'src/app/clases/materia';
import { CloudStorageService } from '../../services/cloud-storage.service';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.scss']
})
export class ListaMateriasComponent implements OnInit {
  @Input() activarInscripcion: boolean;
  @Input() activarAlumno: boolean;
  @Input() activarInscripcionAlumno: boolean;
  @Output() emitMateria = new EventEmitter<IMateria>();
  lista = [];

  constructor(
    private cloudService: CloudStorageService
  ) {
    this.cloudService.coleccionMaterias.snapshotChanges().subscribe((snap) =>{
      //console.log("--------------CAMBIO DETECTADO---------------------");
      this.lista = [];
      snap.forEach((data) => {
        console.log("for each",data.payload.doc.data());
        let materia: IMateria = data.payload.doc.data();
        materia.id = data.payload.doc.id;
        this.lista.push(materia);
      });
    });
  }

  ngOnInit(): void {
  }

  enviarMateria(materia: IMateria){
    this.emitMateria.emit(materia);
  }
}
