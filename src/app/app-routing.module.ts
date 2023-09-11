import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  },
  {
    path: 'create-task', component: CreateTaskComponent,
  },
  {
    path: 'create-user', component: CreateUserComponent,
  },
  {
    path: 'task/:id', component: EditTaskComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
