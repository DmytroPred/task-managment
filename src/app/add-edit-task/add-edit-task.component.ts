import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription, switchMap } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { STATES } from '../common/data/states.data';
import { Task } from '../common/models/task.interface';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-add-edit-task',
  templateUrl: './add-edit-task.component.html',
  styleUrls: ['./add-edit-task.component.scss']
})
export class AddEditTaskComponent implements OnInit, OnDestroy {
  isAddMode?: boolean;
  task?: Task;
  users?: User[];

  states = STATES;

  subscription?: Subscription;

  constructor(
    public dialog: MatDialog, 
    private userService: UserService,
    private taskService: TaskService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.isAddMode = !this.route.snapshot.params['id'];

    if(!this.isAddMode) {
      this.getTaskAndUsers();
    } else {
      this.subscription = this.userService.users$.subscribe(users => {
        this.users = users.filter(user => !user.assignedTask?.id);
      });
    }
  }

  openWarningDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'task'
    });

    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result) this.deleteTask();
    });
  }

  deleteTask(): void {
    this.taskService.deleteTask(this.task?.id ?? '');
    this.location.back();
  }

  saveTask(task: Task): void {
    this.userService.reassignUserTask(task);

    if(this.isAddMode) {
      this.taskService.createTask(task);
    } else {
      this.taskService.updateTask(task);
    }

    this.snackbarService.openSnackBar(`Task ${ this.isAddMode ? 'created' : 'updated'}!`, 'Close');
  }

  assignTaskById(tasks: Task[]): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.task = tasks.find(task => task.id === params['id']);
    });
  }

  getTaskAndUsers(): void {
    this.taskService.tasks$.pipe(switchMap(tasks => {
      this.assignTaskById(tasks);

      return this.userService.users$.pipe(first());
    })).subscribe(users => {
      this.users = users.filter(user => !user.assignedTask?.id || user.id === this.task?.assignedUser?.id);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
