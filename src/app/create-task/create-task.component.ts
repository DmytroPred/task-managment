import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Task } from '../common/models/task.interface';
import { TaskService } from '../common/services/task.service';
import { UserService } from '../common/services/user.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    selectedUser: new FormControl(''),
  });

  constructor(private taskService: TaskService, public userService: UserService) { }

  submitTask(formDirective: FormGroupDirective) {
    const date = new Date();
    const formValue = this.taskForm.value;

    if(formValue.name && formValue.description) {
      const task: Task = {
        id: date.getTime().toString(),
        name: formValue.name,
        description: formValue.description,
        creationDate: date,
        modificationDate: date,
        state: 'in queue',
      }

      this.updateTasksSubject(task, formDirective);
    }
  }

  updateTasksSubject(task: Task, formDirective: FormGroupDirective) {
    this.taskService.tasks$.pipe(first()).subscribe(tasks => {
      tasks.push(task);
      this.taskService.tasks$.next(tasks);


      this.taskForm.reset();
      formDirective.resetForm();
    });
  }
}
