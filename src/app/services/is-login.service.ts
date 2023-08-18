import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {

  constructor() { }

  isLogin = new BehaviorSubject<boolean>(localStorage.getItem('email') !== null);


}
