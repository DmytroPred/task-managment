import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { DeleteDialogComponent } from '../common/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  constructor(public dialog: MatDialog) {}

  openWarningDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: 'user'
    });


    dialogRef.afterClosed().pipe(first()).subscribe(result => {
      if(result) this.deleteUser();
    });
  }


  deleteUser() {
  }
}
