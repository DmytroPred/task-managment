import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { STATES } from '../common/data/states.data';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { Task } from '../common/models/task.interface';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task?: Task;
  users?: User[];

  states = STATES;

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    selectedUser: new FormControl(''),
    state: new FormControl(''),
  });

  constructor(
    public dialog: MatDialog, 
    private taskService: TaskService,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.pipe(switchMap(tasks => {
      const taskId = this.getTaskId();
      this.task = tasks.find(task => task.id === taskId);

      return this.userService.users$.pipe(first());
    })).subscribe(users => {
      this.users = users.filter(user => !user.assignedTask?.id || user.id === this.task?.assignedUser?.id);
      this.updateTaskFormValues();
    });
  }

  openWarningDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'task'
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result) this.deleteTask();
    });
  }

  deleteTask() {
    this.taskService.deleteTask(this.task?.id ?? '');
    this.router.navigateByUrl('');
  }

  getTaskId(): string {
    return this.router.url.split('/').at(-1) ?? '';
  }

  submitTask() {
    const date = new Date();
    const formValue = this.taskForm?.value;
    const assignedUser = this.users?.find(user => user.id === formValue.selectedUser);

    if(formValue.name && formValue.description) {
      const task: Task = {
        id: this.task?.id ?? '',
        name: formValue.name,
        description: formValue.description,
        creationDate: this.task?.creationDate as Date,
        modificationDate: date,
        state: formValue.state,
        assignedUser: assignedUser,
      }

      this.userService.reassignUserTask(task);

      this.taskService.updateTask(task);
      this.snackbarService.openSnackBar('Task updated!', 'Close');
    }
  }

  updateTaskFormValues(): void {
    this.taskForm.patchValue({
      name: this.task?.name,
      description: this.task?.description,
      selectedUser: this.task?.assignedUser?.id ?? '',
      state: this.task?.state,
    });
  }
}
