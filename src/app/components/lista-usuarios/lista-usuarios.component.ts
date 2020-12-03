import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { IUsuario } from 'src/app/clases/usuario';
import { TipoPipe } from '../../pipes/tipo.pipe';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {
  @Input() lista: IUsuario[];
  valorTipo: string;
  constructor() { }

  ngOnInit(): void {
  }

}


