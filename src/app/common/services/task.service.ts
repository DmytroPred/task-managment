import { Injectable } from '@angular/core';
import { BehaviorSubject, first } from 'rxjs';
import { getCircularReplacer } from '../components/functions/get-circular-replacer';
import { Task } from '../models/task.interface';
import { User } from '../models/user.interface';
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

  initData() {
    const tasks = localStorage.getItem('tasks');

    if(tasks) {
      this.tasks$.next(JSON.parse(tasks));
    } else {
      localStorage.setItem('tasks', JSON.stringify([]));
    }
  }

  deleteTask(taskId: string) {
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

  updateLocalStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks, getCircularReplacer()));
  }
}
