import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { ReturnButtonComponent } from './common/components/return-button/return-button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteDialogComponent } from './common/components/delete-dialog/delete-dialog.component';
import { NavigationTabComponent } from './common/components/navigation-tab/navigation-tab.component';
import { UserListComponent } from './user-list/user-list.component';
import { TaskListComponent } from './task-list/task-list.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { UserFormComponent } from './common/components/user-form/user-form.component';
import { AddEditTaskComponent } from './add-edit-task/add-edit-task.component';
import { TaskFormComponent } from './common/components/task-form/task-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ReturnButtonComponent,
    DeleteDialogComponent,
    NavigationTabComponent,
    UserListComponent,
    TaskListComponent,
    AddEditUserComponent,
    UserFormComponent,
    AddEditTaskComponent,
    TaskFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
