import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable, take} from "rxjs";
import {MentorDetails} from "../core/models/mentorDetails";
import {AuthService} from "./auth.service";
import {User} from "../core/models/user";
import {NotificationService} from "./notification.service";
import {Router} from "@angular/router";

@Injectable({
	providedIn: 'root'
})
export class MentorService {
	mentorData: MentorDetails;
	userData = this.auth.user.pipe(take(1));
	private mentorState: BehaviorSubject<string> = new BehaviorSubject('');

	constructor(
		private auth: AuthService,
		private db: AngularFirestore,
		private notificationService: NotificationService,
		private router: Router) {
	}

	set changeState(value: string) {
		this.mentorState.next(value);
		console.log(`Mentor state was changed. Emitting ${value}`);
	}

	getState(): Observable<string> {
		return this.mentorState.asObservable();
	}

	checkState(): void {
		this.userData.subscribe((userData) => {
			if (!!userData) {
				console.log('userData.isMentor in checkState', userData.isMentor)
				this.changeState = (userData.isMentor) ? 'mentor' : '';
			}
		});
	}

	updateMentor(uid: string, mentor: MentorDetails) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${uid}`);
		return userRef.update({...mentor, isMentor: true}).then((_) => {
			this.notificationService.addSuccess('Congratulations! You are now one of us!');
			this.changeState = 'mentor';
			this.router.navigate(['/dashboard']);
		}, (reason) => {
			this.notificationService.addError(reason);
		});
	}
}
