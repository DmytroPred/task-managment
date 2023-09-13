import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from '../common/models/task.interface';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit, OnDestroy {
  users?: User[];
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    selectedUser: new FormControl({name: '', id: ''}),
  });

  subscription?: Subscription;

  constructor(
    private taskService: TaskService, 
    private userService: UserService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.userService.users$.subscribe(users => {
      this.users = users.filter(user => !user.assignedTask?.id);
    });
  }

  submitTask(formDirective: FormGroupDirective): void {
    const date = new Date();
    const formValue = this.taskForm.value;

    if(formValue.name && formValue.description) {
      const task: Task = {
        id: date.getTime().toString(),
        name: formValue.name,
        description: formValue.description,
        creationDate: date,
        modificationDate: date,
        state: formValue.selectedUser?.id ? 'in progress' : 'in queue',

        assignedUser: {
          name: formValue.selectedUser?.name ?? '',
          id: formValue.selectedUser?.id ?? '',
        }      
      }

      if(formValue.selectedUser?.id) {
        this.userService.assignUser(formValue.selectedUser, task);
      }

      this.createTask(task, formDirective);
      this.snackbarService.openSnackBar('Task created!', 'Close');
    }
  }

  createTask(task: Task, formDirective: FormGroupDirective): void {
    this.taskService.createTask(task);
    this.taskForm.reset();
    formDirective.resetForm();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
