import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListViewService } from '../../services/list-view.service';

@Component({
  selector: 'app-navigation-tab',
  templateUrl: './navigation-tab.component.html',
  styleUrls: ['./navigation-tab.component.scss']
})
export class NavigationTabComponent implements OnInit {
  isTaskListView: boolean = true;

  subscription?: Subscription;

  constructor(
    private listViewService: ListViewService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscription = this.listViewService.taskListView$.subscribe(state => this.isTaskListView = state);
  }

  toggleLists(): void {
    this.isTaskListView = !this.isTaskListView;
    this.isTaskListView ? this.navigate('task-list') : this.navigate('user-list');
  }

  navigate(route: string): void {
    this.router.navigateByUrl(route);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
