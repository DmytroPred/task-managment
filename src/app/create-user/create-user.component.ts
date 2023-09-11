import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { User } from '../common/models/user.interface';
import { SnackbarService } from '../common/services/snackbar.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private snackbarService: SnackbarService) {}

  submitUser(formDirective: FormGroupDirective) {
    const date = new Date();
    const formValue = this.userForm.value;

    if(formValue.name) {
      const user: User = {
        id: date.getTime().toString(),
        name: formValue.name,
      }

      this.updateUsersSubject(user, formDirective);
      this.snackbarService.openSnackBar('User successfully created!', 'Close');
    }
  }

  updateUsersSubject(user: User, formDirective: FormGroupDirective) {
    this.userService.users$.pipe(first()).subscribe(users => {
      users.push(user);
      this.userService.users$.next(users);


      this.userForm.reset();
      formDirective.resetForm();
    });
  }
}
