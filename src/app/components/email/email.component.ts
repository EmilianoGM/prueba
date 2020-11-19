import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  email:string;

  constructor(
    private authService: AuthService
  ) {
    this.email = "Esperando";
    this.authService.getAuthState().subscribe((authState) => {
      if(authState){
        this.email = authState.email;
      }
    });
  }

  ngOnInit(): void {
  }

}
