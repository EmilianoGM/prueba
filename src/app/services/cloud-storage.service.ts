import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuario, IUsuarioUID } from '../clases/usuario';
import { IMateria } from '../clases/materia';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  coleccionUsuarios: AngularFirestoreCollection<IUsuario>;
  coleccionMaterias: AngularFirestoreCollection<IMateria>;
  coleccionProfesores: AngularFirestoreCollection<IUsuario>;

  itemUsuario : Observable<IUsuarioUID[]>;
  listaUsuarios: IUsuarioUID[];

  constructor(
    private dataBase: AngularFirestore
  ) {
    this.coleccionUsuarios = this.dataBase.collection<IUsuario>('usuarios');
    this.coleccionMaterias = this.dataBase.collection<IMateria>('materias');
    this.coleccionProfesores = this.dataBase.collection<IUsuario>('profesores');
  }

  /**
   * traerUsuarios
   */
  public traerUsuarios() {
    this.itemUsuario = this.coleccionUsuarios.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IUsuario;
        const uid = a.payload.doc.id;
        return {uid, ...data};
      }))
    );
  }

  public getListaMaterias(){
    return this.coleccionMaterias.valueChanges();
  }

  public getListaUsuarios(){
    return this.coleccionUsuarios.valueChanges();
  }

  public getListaProfesores(){
    return this.coleccionProfesores.valueChanges();
  }

  public cargarMateria(data: IMateria) {
    let id = this.dataBase.createId();
    this.coleccionMaterias.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  public generarId(){
    return this.dataBase.createId();
  }
}
