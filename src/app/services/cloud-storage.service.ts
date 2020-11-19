import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuario, IUsuarioUID } from '../clases/usuario';
import { IMascota, IMascotaID } from '../clases/mascota';
import { IMensajeChat } from '../clases/chat';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  coleccionUsuarios: AngularFirestoreCollection<IUsuario>;
  coleccionMacotas:  AngularFirestoreCollection<IMascota>;
  coleccionMensajes: AngularFirestoreCollection<IMensajeChat>;

  itemUsuario : Observable<IUsuarioUID[]>;
  itemMascotas : Observable<IMascotaID[]>;
  listaUsuarios: IUsuarioUID[];

  constructor(
    private dataBase: AngularFirestore
  ) {
    this.coleccionUsuarios = this.dataBase.collection<IUsuario>('usuarios');
    this.coleccionMacotas = this.dataBase.collection<IMascota>('mascotas');
    this.coleccionMensajes = this.dataBase.collection<IMensajeChat>('mensajes',ref => ref.orderBy("fecha", "asc"));
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

  public getListaMensajes(){
    return this.coleccionMensajes.valueChanges();
  }

  public getMensaje(id: string){
    return this.coleccionMensajes.doc(id).valueChanges();
  }

  public crearMensaje(mensaje: IMensajeChat){
    let id = this.dataBase.createId();
    this.coleccionMensajes.doc(id).set(mensaje).then(respuesta => {
      console.log(respuesta);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  public getMascota(id: string) {
    return this.coleccionMacotas.doc(id).valueChanges();
  }

  public traerMascotas(): Observable<IMascotaID[]> {
    this.itemMascotas = this.coleccionMacotas.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IMascota;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
    return this.itemMascotas;
    /*
    console.log('USUARIOS:', this.itemUsuario);
    this.itemUsuario.forEach( a => {
      this.listaUsuarios = a;
      this.listaUsuarios.forEach(usuario => {
        console.log("Usuario:", usuario.id);
      })
      console.log("Usuarios", this.listaUsuarios);
    });
    */
  }

  public cargarMascota(data: IMascota) {
    let id = this.dataBase.createId();
    this.coleccionMacotas.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error " + error);
    });
  }

  public generarId(){
    return this.dataBase.createId();
  }
}
