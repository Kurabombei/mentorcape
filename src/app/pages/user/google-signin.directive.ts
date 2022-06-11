import {Directive, HostListener} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MentorService} from "../../services/mentor.service";

@Directive({
	selector: '[appGoogleSignin]'
})
export class GoogleSigninDirective {
	constructor(private auth: AuthService, private mentorService: MentorService) {
	}

	@HostListener('click')
	onclick() {
		this.auth.signInWithPopup().then((res) => {
			this.mentorService.checkState();
		});
	}
}
