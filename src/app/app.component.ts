import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './components/menu/menu.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PruebaSegParcial';
  hayUsuario: boolean;

  constructor(
    private fireAuthService: AuthService,
    private router: Router
  ){
    this.fireAuthService.getAuthState().subscribe((authState) => {
      if(authState){
        this.hayUsuario = true;
      } else {
        this.hayUsuario = false;
      }
    });
  }

  public logOut(){
    if(this.hayUsuario){
      this.fireAuthService.logoutUsuario().then((res) => {
        this.router.navigateByUrl('/login');
      });
    }
  }

}
