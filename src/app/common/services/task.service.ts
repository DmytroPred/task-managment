import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { Task } from '../models/task.interface';
import { User } from '../models/user.interface';
import { getUnixTime } from '../utilities/get-unix-time';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$ = new BehaviorSubject<Task[]>([]);

  constructor(private userService: UserService) { 
    this.initData();

    this.tasks$.subscribe(tasks => this.updateLocalStorage(tasks));
  }

  initData(): void {
    const tasks = localStorage.getItem('tasks');

    if(tasks) {
      this.tasks$.next(JSON.parse(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }

  createTask(task: Task): void {
    this.tasks$.pipe(first()).subscribe(tasks => {
      tasks.unshift(task);
      this.tasks$.next(tasks);
    });
  }

  updateTask(task: Task): void {
    this.tasks$.pipe(first()).subscribe(tasks => {
      const index = tasks.findIndex(item => item.id === task.id);
      tasks[index] = task;
      this.tasks$.next(tasks);
    });
  }

  updateAssignedUser(taskId: string, user: User): void {
    this.tasks$.pipe(first()).subscribe(tasks => {
      // unassign user from task
      tasks.forEach((item: Task) => {
        if(item.assignedUser?.id === user.id) {
          delete item.assignedUser;
        }
      });

      // assign new user to task
      const index = tasks.findIndex(task => task.id === taskId);
      tasks[index].assignedUser = {
        id: user.id,
        name: user.name,
      };
      tasks[index].modificationDate = new Date();

      this.tasks$.next(tasks);
    });
  }

  unassignTask(taskId: string): void {
    this.tasks$.pipe(first()).subscribe(tasks => {
      tasks.forEach(task => {
        if(taskId === task.id) {
          delete task.assignedUser;
          task.state = 'in queue';
        }

        this.tasks$.next(tasks);
      });
    })
  }

  deleteTask(taskId: string): void {
    if(!taskId) return;
    let deletedTask: Task; 

    this.tasks$.pipe(first()).subscribe(tasks => {
      const index = tasks.findIndex(task => taskId === task.id);
      deletedTask = tasks.splice(index, 1)[0];

      this.tasks$.next(tasks);

      if(deletedTask.assignedUser?.id) {
        this.userService.unassignUser(deletedTask.assignedUser);
      }
    });
  }

  updateLocalStorage(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
