import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IUsuario, IUsuarioUID } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estadoAutenticacion;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private dataBase: AngularFirestore
  ) {
    this.angularFireAuth.authState.subscribe( (authState) => {
      console.log("Estado autenticacion", authState);
      //this.estadoAutenticacion = authState;
    });
  }

  /**
   * Para loggear un usuario de Firebase
   * @param value Recibe datos con un campo email y otro password
   */
  public loginUsuario(value){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }

  /**
   * Para registrar un usuario en Firebase
   * @param value Recibe datos con campos email, password, nombre y apellido
   */
  public registrarUsuario(value){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            let usuario: IUsuario = {
              correo: value.email,
              tipo: value.tipo
            };
            this.dataBase.collection('usuarios').doc(res.user.uid).set(usuario);
            resolve(res);
          },
          err => reject(err))
    });
  }

  /**
   * Desloggea al usuario
   */
  public logoutUsuario() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            console.log("Error en logout", error);
            reject();
          });
      }
    });
  }

  public getAuthState(): Observable<any>{
    return this.angularFireAuth.authState;
  }

}
