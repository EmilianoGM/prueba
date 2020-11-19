import { Component, OnInit } from '@angular/core';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fireAuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public registrarUsuario(value){
    console.log("Formulario registro:", value);
    /*
    this.fireAuthService.registrarUsuario(value)
      .then((res) => {
        this.router.navigateByUrl("/login");
      }, (err) => {
        console.log("ERROR al registrarse", err);
      });
    */
  }

}
