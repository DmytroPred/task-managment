import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { first, Subscription } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { Task } from '../common/models/task.interface';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit, OnDestroy {
  isAddMode?: boolean;
  user?: User;
  tasks?: Task[];

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

    if(this.isAddMode) {
      this.getUnassignedTaskList();
    }

    if(!this.isAddMode) {
      this.userService.users$.pipe(first()).subscribe(users => this.getUserById(users));
    }
  }

  openWarningDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'user'
    });


    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result) this.deleteUser();
    });
  }

  getUserById(users: User[]): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.user = users.find(user => user.id === params['id']);

      this.getUnassignedTaskList();
    });
  }

  getUnassignedTaskList(): void {
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = tasks.filter(task => !task.assignedUser || task.id === this.user?.assignedTask?.id);
    });
  }

  deleteUser(): void {
    if(!this.user) return;
    
    if(this.user.assignedTask) {
      this.taskService.unassignTask(this.user.assignedTask.id);
    }
  
    this.userService.deleteUser(this.user);
    this.location.back();
  }

  saveUser(user: User): void {
    if(this.isAddMode) {
      this.createUser(user);
    }

    if(!this.isAddMode) {
      this.updateUser(user);
    }

    if(user.assignedTask?.id) {
      this.taskService.updateAssignedUser(user.assignedTask?.id, user);
    }

    this.snackbarService.openSnackBar(`User successfully ${ this.isAddMode ? 'created' : 'updated'}!`, 'Close');
  }

  createUser(user: User): void {
    this.userService.createUser(user);
  }

  updateUser(user: User): void {
    this.userService.updateUser(user);
    if(this.user) {
      this.user.assignedTask = user.assignedTask;
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
