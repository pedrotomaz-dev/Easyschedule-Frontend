import { Component, inject } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-snackbar',
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  constructor(private snackbarService: SnackbarService) {}

  showSuccess(message: string, duration?: number) {
    this.snackbarService.showMessage(message, 'success', duration);
  }

  showError(message: string, duration?: number) {
    this.snackbarService.showMessage(message, 'error', duration);
  }
}
