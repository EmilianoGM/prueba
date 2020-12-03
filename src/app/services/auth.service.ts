import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { IUsuario, IUsuarioUID } from '../clases/usuario';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  estadoAutenticacion: boolean = false;
  uid: string;
  tipo: string;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private dataBase: AngularFirestore,
    private tokenService: TokenService
  ) {
    /*
    this.token = localStorage.getItem('token');
    this.estadoAutenticacion = false;
    this.angularFireAuth.authState.subscribe( (authState) => {
      console.log("Estado autenticacion: ", authState);
      let json =
        {
          bandera: false,
        }

      if(authState){
        json =
          {
            bandera: true,
          }

      }
      localStorage.setItem("token", JSON.stringify(json));
      //this.estadoAutenticacion = authState;
    });**/
  }

  /**
   * Para loggear un usuario de Firebase
   * @param value Recibe datos con un campo email y otro password
   */
  /*
  public loginUsuario(value){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password).then((res)=>{
        this.isLogged();
        this.getUID().then((uid) =>{
          this.setTipo(uid);
          resolve();
        });
      }).catch((err)=>{
        console.log(err);
        reject();
      });
    });
  }*/

  public async loginUsuario(value){
    console.log('en login');
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password).then((res)=>{
        this.setTipo(value.email).then((data) => {
          console.log('Tipo de devolucion de set tipo promesa', data);
          if(data){
            resolve();
          } else {
            reject();
          }
        })
      }).catch((err)=>{
        console.log(err);
        reject();
      });
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
            if(usuario.tipo == 'profesor'){
              this.dataBase.collection('profesores').doc(res.user.uid).set(usuario);
            }
            if(usuario.tipo == 'alumno'){
              this.dataBase.collection('alumnos').doc(res.user.uid).set(usuario);
            }
            resolve(res);
          },
          err => reject(err))
    });
  }

  public registrarAdmin(value){
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            let usuario: IUsuario = {
              correo: value.email,
              tipo: 'admin'
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
            this.tokenService.resetToken();
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


  public isLogged(){
    let observable:Observable<any> = this.angularFireAuth.user;
    if(observable != null){
      this.angularFireAuth.user.subscribe((data) =>{
        console.log("USUARIO",data);
      });
    } else {
      console.log("observable null");
    }
  }


  public async getUID(): Promise<string>{
    let observador: Subscription;
    let uid: string;
    const terminado = await new Promise<boolean>((resolve,reject) => {
      try{
        observador = this.angularFireAuth.user.subscribe((user) =>{
          this.estadoAutenticacion = true;
          uid = user.uid;
          this.uid = user.uid;
          resolve(true);
        });
      } catch(error){
        console.log("Error en funcion getUID,", error);
        reject(false);
      }
    });
    if(terminado){
      observador.unsubscribe();
      return uid;
    } else {
      console.log("No hay uid");
      return "error";
    }
  }

  /*
  public async setTipo(uid: string): Promise<boolean>{
    const terminado = await new Promise<boolean>((resolve,reject) => {
      try{
        let coleccion = this.dataBase.collection<IUsuario>('usuarios');
        coleccion.doc<IUsuario>(uid).valueChanges().subscribe((data)=>{
          //console.log("observador en tipo", data);
          this.tipo = data.tipo;
        });
        resolve(true);
      } catch(error){
        console.log("Error en funcion getUID,", error);
        reject(false);
      }
    });
    if(terminado == true || terminado == false){
      return terminado;
    }
  }
  */

  public async setTipo(correo: string): Promise<boolean>{
    let observable: Subscription;
    const terminado = await new Promise<boolean>((resolve,reject) => {
      try{
        observable = this.dataBase.collection<IUsuario>('usuarios').valueChanges().subscribe((data)=>{
          let usuario: IUsuario = data.find(user => user.correo == correo);
          this.tokenService.setToken(usuario.tipo, correo);
          resolve(true);
        });
      } catch(error){
        console.log("Error en funcion Set TIPO,", error);
        reject(false);
      }
    });
    if(terminado == true || terminado == false){
      observable.unsubscribe();
      return terminado;
    }
  }

}
