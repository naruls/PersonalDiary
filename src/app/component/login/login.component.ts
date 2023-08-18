import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { IsLoginService } from 'src/app/services/is-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    private isLoginService: IsLoginService
    ) {}

  form = new FormGroup({
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8)
    ])
  })

  get email() {
    return this.form.controls.email as FormControl
  }

  get password() {
    return this.form.controls.password as FormControl
  }

  login() {
    const userData = Object.assign(this.form.value)
    this.authService.sign(userData).then((res:any) => {
      this.router.navigate(['main']);
      localStorage.setItem("email", res.user._delegate.email);
      this.isLoginService.isLogin.next(true);
    }).catch((err: any) => {
      console.log(err)
    })
  }

}
