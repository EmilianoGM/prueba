import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMateria } from '../../clases/materia';
import { ListaProfesoresComponent } from '../lista-profesores/lista-profesores.component';
@Component({
  selector: 'app-materia-register-form',
  templateUrl: './materia-register-form.component.html',
  styleUrls: ['./materia-register-form.component.scss']
})
export class MateriaRegisterFormComponent implements OnInit {
  @Output() emitData = new EventEmitter<any>();
  formMateriaRegister: FormGroup;
  hayProfesor: boolean = false;
  mensajeProfesor = "¡Atención! Tenes que seleccionar un profesor de la lista";
  emailProfesor;
  mensajesValidacion = {
    'nombre': [
      { tipo: 'required', mensaje: 'El nombre es requerido.' },
    ],
    'cuatrimestre': [
      { tipo: 'required', mensaje: 'El cuatrimestre es requerido.' },
    ],
    'cupo': [
      { tipo: 'required', mensaje: 'El cupo es requerido.' },
      { tipo: 'min', mensaje: 'El minimo es 1.' },
      { tipo: 'max', mensaje: 'El maximo es 100.'}
    ],
    'year': [
      { tipo: 'required', mensaje: 'El año es requerido.' },
      { tipo: 'min', mensaje: 'El minimo es 1990.' },
      { tipo: 'max', mensaje: 'El maximo es 2020.'}
    ],
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formMateriaRegister = this.formBuilder.group({
      nombre: [
        '',
        [Validators.required,
        ]
      ],
      cuatrimestre: [
        '',
        [Validators.required,]
      ],
      cupo: [
        '1',
        [Validators.required,
        Validators.min(1),
        Validators.max(100)]
      ],
      year: [
        '2020',
        [Validators.required,
        Validators.min(1990),
        Validators.max(2020)]
      ]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(loginData){
    if(this.hayProfesor){
      let materia: IMateria = {
        nombre: loginData.nombre,
        cuatrimestre: loginData.cuatrimestre,
        cupo: loginData.cupo,
        year: loginData.year,
        profesor: this.emailProfesor
      }
      this.emitData.emit(materia);
    } else {
      this.hayProfesor = false;
      this.mensajeProfesor = "¡Atención! Tenes que seleccionar un profesor de la lista";
    }
  }

  public agregarProfesor(value){
    this.hayProfesor = true;
    this.mensajeProfesor = "Profesor seleccionado! Ya podes registrar la materia.";
    this.emailProfesor = value;
  }
}
