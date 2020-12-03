import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token;
  constructor() {
    this.token = localStorage.getItem('token');
  }

  public isLogged(){
    return this.token != null;
  }

  public setToken(tipo: string, correo: string){
    let json =
      {
        ingresado: true,
        tipo: tipo,
        email: correo
      };
    localStorage.setItem("token", JSON.stringify(json));
  }

  public getToken(){
    if (this.isLogged()){
      return JSON.parse(this.token);
    } else{
      return null;
    }
  }

  public resetToken(){
    let json =
      {
        ingresado: false,
        tipo: '',
        email: ''
      }
    localStorage.setItem("token", JSON.stringify(json));
  }
}
