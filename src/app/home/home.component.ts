import { Component, OnInit } from '@angular/core';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';
import { TASK_HEADERS } from './data/home.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  headers: string[] = TASK_HEADERS;
  // constructor(private taskService: TaskService, private userService: UserService) {}
  constructor(public taskService: TaskService, public userService: UserService) {}

  ngOnInit(): void {
    
  }
}
