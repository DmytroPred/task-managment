import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListViewService } from '../common/services/list-view.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';
import { TASK_TABLE_HEADERS, USER_TABLE_HEADERS } from '../common/data/home-page.data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  taskTableHeaders: string[] = TASK_TABLE_HEADERS;
  userTableHeaders: string[] = USER_TABLE_HEADERS;

  isTaskListView: boolean = true;

  constructor(
    public taskService: TaskService, 
    public userService: UserService,
    public listViewService: ListViewService,
  ) {}

  subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.listViewService.taskListView$.subscribe(state => this.isTaskListView = state);   
  }

  toggleLists() {
    this.listViewService.taskListView$.next(!this.isTaskListView);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
