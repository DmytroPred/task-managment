import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks$ = new BehaviorSubject<Task[]>([]);

  constructor() { 
    this.initData();

    this.tasks$.subscribe(tasks => this.updateLocalStorage(tasks));
  }

  initData() {
    const tasks = localStorage.getItem('tasks');

    if(tasks) {
      this.tasks$.next(JSON.parse(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }

  updateLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
