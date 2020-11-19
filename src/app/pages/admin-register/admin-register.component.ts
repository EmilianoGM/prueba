import { Component, OnInit } from '@angular/core';
import { AdminRegisterFormComponent } from '../../components/admin-register-form/admin-register-form.component';
import { AuthService } from '../../services/auth.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

  constructor(
    private fireAuthService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public registrarUsuario(value){
    //console.log("Formulario registro:", value);
    this.fireAuthService.registrarAdmin(value)
      .then((res) => {
        this.router.navigateByUrl("/login");
      }, (err) => {
        console.log("ERROR al registrarse", err);
      });
  }

}
