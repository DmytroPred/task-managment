import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(
    text: string, 
    button: string, 
    horizontalPosition: MatSnackBarHorizontalPosition = 'end', 
    verticalPosition: MatSnackBarVerticalPosition = 'top'
  ): void
  {
    this.snackBar.open(text, button, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition
    })
  }
}
