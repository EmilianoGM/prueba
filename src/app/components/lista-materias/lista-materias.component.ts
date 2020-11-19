import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloudStorageService } from '../../services/cloud-storage.service';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.scss']
})
export class ListaMateriasComponent implements OnInit {
  lista = [];

  constructor(
    private cloudService: CloudStorageService
  ) {
    this.cloudService.getListaMaterias().subscribe((snap) =>{
      snap.forEach((user) => {
        this.lista.push(user);
      });
    });
  }

  ngOnInit(): void {
  }

}
