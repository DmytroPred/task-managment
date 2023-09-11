import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';
import { Task } from '../common/models/task.interface';
import { TaskService } from '../common/services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {
  task?: Task;

  constructor(
    public dialog: MatDialog, 
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskService.tasks$.pipe(first()).subscribe(tasks => {
      const taskId = this.getTaskId();
      this.task = tasks.find(task => task.id === taskId);
    })    
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
  }

  getTaskId(): string {
    return this.router.url.split('/').at(-1) ?? '';
  }
}
