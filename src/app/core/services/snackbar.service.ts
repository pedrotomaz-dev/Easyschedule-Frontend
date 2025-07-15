import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  showMessage(
    message: string,
    type: 'success' | 'error' | 'info' | 'warning' = 'info',
    duration: number = 5000
  ) {
    this.snackBar.open(message, 'Fechar', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
  }
}
