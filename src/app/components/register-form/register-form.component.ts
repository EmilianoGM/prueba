import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  @Output() emitData = new EventEmitter<any>();
  formRegister: FormGroup
  mensajesValidacion = {
    'email': [
      { tipo: 'required', mensaje: 'El email es requerido.' },
      { tipo: 'email', mensaje: 'Recorda que debe tener formato de email (ejemplo@ejemplo.com).'}
    ],
    'password': [
      { tipo: 'required', mensaje: 'La contraseña es requerida.' },
      { tipo: 'minlength', mensaje: 'La contraseña debe contener al menos 6 caracteres.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.formRegister = this.formBuilder.group({
      email: [
        '',
        [Validators.required,
          Validators.email]
      ],
      password: [
        '',
        [Validators.required,
        Validators.minLength(6)]
      ],
      tipo: [
        'admin',
        [Validators.required]
      ]
    });
  }

  ngOnInit(): void {
  }

  public onSubmit(loginData){
    this.emitData.emit(loginData);
  }
}
