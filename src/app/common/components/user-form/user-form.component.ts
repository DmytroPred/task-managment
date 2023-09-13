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
    if(this.userForm.invalid) {
      return;
    }

    this.userChangeEvent.emit(this.getUser());

    if(this.isAddMode) {
      this.userForm.reset();
      formDirective.resetForm();
    }
  }

  getUser(): User {
    const id = this.user?.id || Date.now().toString();
    const name = this.userForm.value.name as string;
    const assignedTask = this.user?.assignedTask || null;

    return { id, name, assignedTask };
  }

  initForm(): void {
    this.userForm.patchValue({
      name: this.user?.name,
    });
  }
}
