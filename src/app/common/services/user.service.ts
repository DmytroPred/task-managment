import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { getCircularReplacer } from '../components/functions/get-circular-replacer';
import { Task } from '../models/task.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users$ = new BehaviorSubject<User[]>([]);

  constructor() {
    this.initData();
    this.users$.subscribe(users => this.updateLocalStorage(users));
  }

  initData() {
    const users = localStorage.getItem('users');

    if(users) {
      this.users$.next(JSON.parse(users));
    } else {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }

  assignUser(user: User, task: Task) {
    this.users$.pipe(first()).subscribe(users => {
      users.map(item => {
        if(item.id === user.id) {
          item.isAssigned = true;
          item.assignedTask = task;
        }
      });

      this.users$.next(users);
    });
  }

  unassignUser(assignedUser: User) {
    this.users$.pipe(first()).subscribe(users => {
      users.map(item => {
        if(item.id === assignedUser.id) {
          item.isAssigned = false;
          delete item.assignedTask;
        }
      });

      this.users$.next(users);
    });
  }

  updateLocalStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users, getCircularReplacer()));
  }
}
