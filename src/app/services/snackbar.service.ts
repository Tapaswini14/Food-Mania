import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(message: string, action: string = 'Close') {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });

    snackBarRef.afterDismissed().subscribe(() => {
      this.onSnackBarDismissed();
    });
  }

  onSnackBarDismissed() {}
}
