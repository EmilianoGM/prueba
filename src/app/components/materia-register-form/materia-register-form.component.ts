import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMateria } from '../../clases/materia';
import { ListaProfesoresComponent } from '../lista-profesores/lista-profesores.component';
@Component({
  selector: 'app-materia-register-form',
  templateUrl: './materia-register-form.component.html',
  styleUrls: ['./materia-register-form.component.scss']
})
export class MateriaRegisterFormComponent implements OnInit {
  @Input() hayProfesor: boolean;
  @Output() emitData = new EventEmitter<any>();
  formMateriaRegister: FormGroup;
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
      this.emitData.emit(loginData);
  }

}
