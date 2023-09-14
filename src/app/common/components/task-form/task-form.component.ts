import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { STATES } from '../../data/states.data';
import { Task } from '../../models/task.interface';
import { User } from '../../models/user.interface';
import { getUnixTime } from '../../utilities/get-unix-time';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input() isAddMode?: boolean;
  @Input() users?: User[];
  @Input() task?: Task;
  @Output() taskChangeEvent: EventEmitter<Task> = new EventEmitter<Task>();

  states = STATES;

  taskForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    selectedUser: new FormControl(''),
    state: new FormControl('in queue'),
  });

  constructor(
    public dialog: MatDialog, 
  ) {}

  ngOnInit(): void {
    if(!this.isAddMode) {
      this.initTaskFormValues();
    }
  }

  submitTask(formDirective: FormGroupDirective): void {
    if(this.taskForm.invalid) {
      return;
    }

    this.taskChangeEvent.emit(this.getTask());

    if(this.isAddMode) {
      this.resetForm(formDirective);
    }
  }

  getTask(): Task {
    const date = new Date();
    const formValue = this.taskForm?.value;
    const assignedUser = this.users?.find(user => user.id === formValue.selectedUser);

    return {
      id: this.task?.id || getUnixTime(),
      name: formValue.name,
      description: formValue.description,
      creationDate: this.task?.creationDate || date,
      modificationDate: date,
      state: formValue.state,
      assignedUser: assignedUser,
    }
  }

  resetForm(formDirective: FormGroupDirective): void {
    this.taskForm.reset();
    formDirective.resetForm();

    this.setDefaultState();
  }

  unassignUserOption(): void {
    this.setDefaultState();
  }

  setDefaultState(): void {
    this.taskForm.patchValue({
      state: 'in queue',
    });
  }

  initTaskFormValues(): void {
    this.taskForm.patchValue({
      name: this.task?.name,
      description: this.task?.description,
      selectedUser: this.task?.assignedUser?.id ?? '',
      state: this.task?.state,
    });
  }
}
