import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Subject, take} from "rxjs";
import {MentorDetails} from "../core/models/mentorDetails";
import {AuthService} from "./auth.service";
import {User} from "../core/models/user";
import {NotificationService} from "./notification.service";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class MentorService {
	isMentor$ = new Subject();
	mentorData: MentorDetails;
	userData = this.auth.user.pipe(take(1));

	constructor(
		private auth: AuthService,
		private db: AngularFirestore,
		private notificationService: NotificationService,
		private router: Router) {
	}

	updateMentor(uid: string, mentor: MentorDetails) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
		return userRef.update({...mentor, isMentor: true}).then((_) => {
			this.notificationService.addSuccess('Congratulations! You are now one of us!');
			this.router.navigate(['/dashboard']);
		}, (reason) => {
			this.notificationService.addError(reason);
		});
	}
}
