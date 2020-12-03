import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private router: Router
  ){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = this.tokenService.getToken();
      console.log('token admin', token);
      if(this.tokenService.isLogged() && token.tipo == 'admin'){
        return true;
      }
      else {
        console.log("admin guard false");
        this.router.navigateByUrl("/home");
        return false;
      }
  }

}
