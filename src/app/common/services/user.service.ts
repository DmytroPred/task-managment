import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
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

  initData(): void {
    const users = localStorage.getItem('users');

    if(users) {
      this.users$.next(JSON.parse(users));
    } else {
      localStorage.setItem('users', JSON.stringify([]));
    }
  }

  createUser(user: User): void {
    this.users$.pipe(first()).subscribe(users => {
      users.unshift(user);
      this.users$.next(users);
    });
  }

  updateUser(user: User): void {
    this.users$.pipe(first()).subscribe(users => {
      const index = users.findIndex(item => item.id === user.id);
      users[index] = user;

      this.users$.next(users);
    });
  }

  assignUser(user: User, task: Task): void {
    this.users$.pipe(first()).subscribe(users => {
      users.map(item => {
        if(item.id === user.id) {
          item.assignedTask = task;
        }
      });

      this.users$.next(users);
    });
  }

  unassignUser(assignedUser: User): void {
    this.users$.pipe(first()).subscribe(users => {
      users.map(user => {
        if(user.id === assignedUser.id) {
          delete user.assignedTask;
        }
      });

      this.users$.next(users);
    });
  }

  reassignUserTask(task: Task): void {
    this.users$.pipe(first()).subscribe(users => {
      if(task.assignedUser?.id) {
        // unassign task
        users.forEach((user: User) => {
          if(user.assignedTask?.id === task.id) {
            delete user.assignedTask;
          }
        });

        // assign task
        users.forEach(user => {
          if(user.id === task.assignedUser?.id) {
            user.assignedTask = {
              id: task.id,
              name: task.name,
              description: task.description,
              creationDate: task.creationDate,
              modificationDate: task.modificationDate,
              state: task.state,
            }
          }
        });
      }

      this.users$.next(users);
    });
  }

  deleteUser(user: User): void {
    this.users$.pipe(first()).subscribe(users => {
      const index = users.findIndex(item => item.id === user.id);
      users.splice(index, 1);

      this.users$.next(users);
    });
  }

  updateLocalStorage(users: User[]) {
    localStorage.setItem('users', JSON.stringify(users));
  }
}
