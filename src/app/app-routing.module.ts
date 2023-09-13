import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { EditUserComponent } from './edit-user/edit-user.component';
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
    path: 'create-task', component: CreateTaskComponent,
  },
  {
    path: 'create-user', component: CreateUserComponent,
  },
  {
    path: 'edit-task/:id', component: EditTaskComponent,
  },
  {
    path: 'edit-user/:id', component: EditUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
