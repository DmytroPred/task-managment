import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent implements OnInit {
  isAddMode?: boolean;
  user?: User;

  constructor(
    public dialog: MatDialog, 
    private userService: UserService,
    private taskService: TaskService,
    private snackbarService: SnackbarService,
    private router: Router,
    private route: ActivatedRoute,    
  ) {}

  ngOnInit(): void {
    this.isAddMode = !this.route.snapshot.params['id'];

    if(!this.isAddMode) {
      this.userService.users$.pipe(first()).subscribe(users => this.assignUserById(users));
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

  assignUserById(users: User[]): void {
    this.route.params.pipe(first()).subscribe(params => {
      this.user = users.find(user => user.id === params['id']);
    });
  }

  deleteUser(): void {
    if(!this.user) return;
    
    if(this.user.assignedTask) {
      this.taskService.unassignTask(this.user.assignedTask.id);
    }
  
    this.userService.deleteUser(this.user);
    this.router.navigateByUrl('');
  }

  saveUser(user: User): void {
    if(this.isAddMode) {
      this.createUser(user);
      this.snackbarService.openSnackBar('User successfully created!', 'Close');
    }

    if(!this.isAddMode) {
      this.updateUser(user);
      this.snackbarService.openSnackBar('User successfully updated!', 'Close');
    }
  }

  createUser(user: User): void {
    this.userService.createUser(user);
  }

  updateUser(user: User): void {
    this.userService.updateUser(user);
    
    if(this.user?.assignedTask?.id) {
      this.taskService.updateAssignedUser(this.user?.assignedTask?.id, user);
    }
  }
}
