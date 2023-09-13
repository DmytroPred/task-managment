import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
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
    path: 'create-user', component: AddEditUserComponent,
  },
  {
    path: 'edit-task/:id', component: EditTaskComponent,
  },
  {
    path: 'edit-user/:id', component: AddEditUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
