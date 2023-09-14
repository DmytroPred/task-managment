import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'task-list', pathMatch: 'full',
  },
  {
    path: 'task-list', component: TaskListComponent,
  },
  {
    path: 'user-list', component: UserListComponent,
  },
  {
    path: 'task', component: AddEditTaskComponent,
  },
  {
    path: 'task/:id', component: AddEditTaskComponent,
  },
  {
    path: 'user', component: AddEditUserComponent,
  },
  {
    path: 'user/:id', component: AddEditUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
