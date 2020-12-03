import { Component, OnInit } from '@angular/core';
import { IUsuario } from 'src/app/clases/usuario';
import { CloudStorageService } from 'src/app/services/cloud-storage.service';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.scss']
})
export class MostrarUsuariosComponent implements OnInit {
  listaUsuarios: IUsuario[] = [];
  constructor(
    private cloudStorage: CloudStorageService
  ) {
    this.cloudStorage.getListaUsuarios().subscribe((lista) => {
      this.listaUsuarios = lista;
    });
  }

  ngOnInit(): void {
  }

}
