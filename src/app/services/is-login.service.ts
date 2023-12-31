import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {

  constructor() { }

  isLogin = new BehaviorSubject<boolean>(localStorage.getItem('email') !== null);

  setIsLogin() {
    this.isLogin.next(true);
  }

  setIsUnLogin() {
    this.isLogin.next(false);
  }

}

// сервис, что отвечает отслеживаниет залогинен ли пользователь и в зависимости от ответа меняет отображение компонента header
