import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {tap} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	defaultHorizontalPos: MatSnackBarHorizontalPosition = 'start';
	defaultVerticalPos: MatSnackBarVerticalPosition = 'bottom';

	constructor(private snackBar: MatSnackBar, private router: Router) {
	}

	addSuccess(message: string) {
		this.snackBar.open(message, 'Ok', {
			duration: 3000,
			horizontalPosition: this.defaultHorizontalPos,
			verticalPosition: this.defaultVerticalPos,
		});
	}

	addError(message: string) {
		this.snackBar.open(message, 'Error', {
			duration: 3000,
			horizontalPosition: this.defaultHorizontalPos,
			verticalPosition: this.defaultVerticalPos,
			panelClass: ['notification', "notification--error"]
		});
	}

	addWarning(message: string) {
		this.snackBar.open(message, 'Warning', {
			duration: 3000,
			horizontalPosition: this.defaultHorizontalPos,
			verticalPosition: this.defaultVerticalPos,
			panelClass: ['notification', "notification--warning"]
		});
	}

	authError() {
		this.snackBar.open('You must be logged in!', 'OK', {
			duration: 5000,
			horizontalPosition: this.defaultHorizontalPos,
			verticalPosition: this.defaultVerticalPos,
			panelClass: ['notification', "notification--error"]
		});
		if (this.snackBar) {

		}
		// @ts-ignore
		return this.snackBar._openedSnackBarRef
			.onAction()
			.pipe(
				tap(_ =>
					this.router.navigate(['/login'])
				)
			)
			.subscribe();
	}
}
