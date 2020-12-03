import { Pipe, PipeTransform } from '@angular/core';
import { IUsuario } from '../clases/usuario';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(lista: IUsuario[], tipo: string): IUsuario[] {
    if(tipo == 'todos'){
      return lista;
    } else {
      return lista.filter(item => item.tipo == tipo);
    }
  }

}
