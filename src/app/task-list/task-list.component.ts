import { Component } from '@angular/core';
import { TASK_TABLE_HEADERS } from '../common/data/home-page.data';
import { TaskService } from '../common/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {
  taskTableHeaders: string[] = TASK_TABLE_HEADERS;

  constructor(
    public taskService: TaskService,
  ) {}
}
