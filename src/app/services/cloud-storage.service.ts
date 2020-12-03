import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUsuario, IUsuarioUID } from '../clases/usuario';
import { IMateria } from '../clases/materia';
import { ICursada } from '../clases/cursada';

@Injectable({
  providedIn: 'root'
})
export class CloudStorageService {
  coleccionUsuarios: AngularFirestoreCollection<IUsuario>;
  coleccionMaterias: AngularFirestoreCollection<IMateria>;
  coleccionProfesores: AngularFirestoreCollection<IUsuario>;
  coleccionAlumnos: AngularFirestoreCollection<IUsuario>;
  coleccionCursadas: AngularFirestoreCollection<ICursada>;

  listaUsuarios: IUsuarioUID[];

  constructor(
    private dataBase: AngularFirestore
  ) {
    this.coleccionUsuarios = this.dataBase.collection<IUsuario>('usuarios');
    this.coleccionMaterias = this.dataBase.collection<IMateria>('materias');
    this.coleccionProfesores = this.dataBase.collection<IUsuario>('profesores');
    this.coleccionAlumnos = this.dataBase.collection<IUsuario>('alumnos');
    this.coleccionCursadas = this.dataBase.collection<ICursada>('cursadas');
  }


  public getListaMaterias(){
    return this.coleccionMaterias.snapshotChanges();
  }

  public getListaUsuarios(){
    return this.coleccionUsuarios.valueChanges();
  }

  public getListaProfesores(){
    return this.coleccionProfesores.valueChanges();
  }

  public getListaAlumnos(){
    return this.coleccionAlumnos.valueChanges();
  }

  public cargarMateria(data: IMateria) {
    let id = this.dataBase.createId();
    let nuevaMateria = data;
    nuevaMateria.alumnos = false;
    this.coleccionMaterias.doc(id).set(data).then(resp => {
      console.log(resp);
    }).catch(error => {
      console.log("error en cargar" + error);
    });
  }

  public cargarCursada(correoAlumno: string, materia: IMateria){
    let id = this.dataBase.createId();
    let nuevaCursada: ICursada = {
      materiaId: materia.id,
      nombreMateria: materia.nombre,
      mailAlumno: correoAlumno,
    }
    this.coleccionCursadas.doc(id).set(nuevaCursada).then(resp => {
      console.log("Cursada agregada", resp);
    }).catch(error => {
      console.log("error en cargar" + error);
    });
    if(materia.alumnos == false){
      let materiaActualizada: IMateria = {
        nombre: materia.nombre,
        cuatrimestre: materia.cuatrimestre,
        cupo: materia.cupo,
        alumnos: true,
        year: materia.year,
        profesor: materia.profesor
      }
      this.coleccionMaterias.doc(materia.id).update(materiaActualizada);
    } else {
      let materiaActualizada: IMateria = {
        nombre: materia.nombre,
        cuatrimestre: materia.cuatrimestre,
        cupo: (materia.cupo - 1),
        alumnos: materia.alumnos,
        year: materia.year,
        profesor: materia.profesor
      }
      this.coleccionMaterias.doc(materia.id).update(materiaActualizada);
    }
  }

  public generarId(){
    return this.dataBase.createId();
  }

  public getColeccionAlumnosMateria(materia: IMateria): AngularFirestoreCollection<ICursada>{
    return this.dataBase.collection<ICursada>('cursadas', ref => ref.where('materiaId', "==", materia.id));
  }

  public getColeccionCursadasAlumno(correo: string): AngularFirestoreCollection<ICursada>{
    return this.dataBase.collection<ICursada>('cursadas', ref => ref.where('mailAlumno', "==", correo));
  }

}
