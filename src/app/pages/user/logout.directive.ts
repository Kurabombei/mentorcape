import {Directive, HostListener} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {NotificationService} from "../../services/notification.service";

@Directive({
	selector: '[appLogout]'
})
export class LogoutDirective {

	constructor(public afAuth: AngularFireAuth, private notificationService: NotificationService) {
	}

	@HostListener('click')
	onclick() {
		this.afAuth.signOut().then(r => this.notificationService.addSuccess('Successfully logged out.'))
	}
}
