import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() isAddMode?: boolean;
  @Input() user?: User;
  @Output() userChangeEvent: EventEmitter<User> = new EventEmitter<User>();

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    if(!this.isAddMode) {
      this.initForm();
    }
  }

  submitForm(formDirective: FormGroupDirective): void {
    const formValue = this.userForm.value;

    if(!formValue.name) return;
  
    let user: User;

    if(this.isAddMode) {
      const date = new Date();

      user = {
        id: date.getTime().toString(),
        name: formValue.name,
      }
    } else {
      user = {
        id: this.user?.id ?? '',
        name: formValue.name,
        assignedTask: this.user?.assignedTask
      }
    }

    this.userChangeEvent.emit(user);

    if(this.isAddMode) {
      this.userForm.reset();
      formDirective.resetForm();
    }
  }

  initForm(): void {
    this.userForm.patchValue({
      name: this.user?.name,
    })
  }
}
