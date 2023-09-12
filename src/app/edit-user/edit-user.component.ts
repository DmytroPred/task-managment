import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user?: User;
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    public dialog: MatDialog, 
    private userService: UserService,
    private taskService: TaskService,
    private snackbarService: SnackbarService,
    private router: Router,    
  ) {}

  ngOnInit(): void {
    this.userService.users$.pipe(first()).subscribe(users => {
      const userId = this.getUserId();
      this.user = users.find(user => user.id === userId);
      this.initForm();
    });
  }

  openWarningDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'user'
    });


    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result) this.deleteUser();
    });
  }

  getUserId(): string {
    return this.router.url.split('/').at(-1) ?? '';
  }

  deleteUser(): void {
    if(!this.user) return;
    
    if(this.user.assignedTask) {
      this.taskService.unassignTask(this.user.assignedTask.id);
    }
  
    this.userService.deleteUser(this.user);
    this.router.navigateByUrl('');
  }

  submitUser() {
    const date = new Date();
    const formValue = this.userForm.value;

    if(formValue.name) {
      const user: User = {
        id: this.user?.id ?? '',
        name: formValue.name,
      }

      this.userService.updateUserSubject(user);
      this.snackbarService.openSnackBar('User successfully updated!', 'Close');
    }
  }

  initForm() {
    this.userForm.patchValue({
      name: this.user?.name,
    })
  }
}
