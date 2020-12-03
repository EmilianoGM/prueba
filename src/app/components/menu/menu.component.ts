import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { EmailComponent} from '../email/email.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() hayUsuarioLoggeado: boolean;
  @Output() logOut = new EventEmitter<any>();

  isNavbarCollapsed=true;
  constructor(
  ) { }

  ngOnInit(): void {
  }

  public salir(){
    this.logOut.emit();
  }
}
