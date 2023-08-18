import {Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { IsLoginService } from 'src/app/services/is-login.service';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  constructor(
    public popupService: PopupService,
    private router: Router,
    private auth: AngularFireAuth,
    private isLoginService: IsLoginService
  ) {
    isLoginService.isLogin.subscribe(value => {this.isLogin = value })
  }

  isLogin = localStorage.getItem('email') !== null;

  logout() {
    this.auth.signOut();
    this.router.navigate(['login'])
    localStorage.removeItem("email")
    this.isLoginService.isLogin.next(false);
  }

}
