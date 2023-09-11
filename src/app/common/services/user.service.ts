import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    this.initData();

    // console.log('service');
    // console.log(JSON.parse(users ?? ''));
    this.users$.subscribe(users => {
      console.log(users);
      this.updateLocalStorage(users);
    })
  }

  initData() {
    const users = localStorage.getItem('users');

    if(users) {
      this.users$.next(JSON.parse(users));
    } else {
      localStorage.setItem('users', JSON.stringify([]));
    }

    console.log(JSON.parse(users ?? ''));
  }

  updateLocalStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
    // this.users$.subscribe(users => {
    //   console.log(users);
    // })
  }
}
