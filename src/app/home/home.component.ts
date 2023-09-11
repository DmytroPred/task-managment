import { Component } from '@angular/core';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';
import { TASK_HEADERS } from './data/home.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  headers: string[] = TASK_HEADERS;
  isTaskShowed = true;

  constructor(public taskService: TaskService, public userService: UserService) {}

  toggleLists() {
    this.isTaskShowed = !this.isTaskShowed;
  }
}
