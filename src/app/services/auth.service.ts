import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebaseAuth from "firebase/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "../core/models/user";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isLoggedIn: boolean = false;
	user: Observable<User | null | undefined>;

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
		this.user = this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.db.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					return of(null);
				}
			})
		)
	}

	async loginWithEmail(email: string, password: string) {
		return await this.afAuth.signInWithEmailAndPassword(email, password);
	}

	async createUserWithEmailAndPassword(email: string, password: string, displayName: string) {
		return await this.afAuth.createUserWithEmailAndPassword(email, password).then((credential) => {
			this.setInitialUserData({...credential.user, displayName: displayName, photoURL: ''});
		});
	}

	async sendPasswordResetEmail(email: string) {
		return await this.afAuth.sendPasswordResetEmail(email);
	}

	signInWithPopup() {
		return this.afAuth.signInWithPopup(new firebaseAuth.GoogleAuthProvider())
			.then((credential) => {
				if (credential.additionalUserInfo?.isNewUser) {
					this.setInitialUserData(credential.user);
				}
			});
	}

	private setInitialUserData(user: any) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

		const newUser: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			isMentor: false
		}

		return userRef.set(newUser);
	}

	private updateUserData(user: any) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

		const newUser: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL,
			isMentor: false
		}

		return userRef.set(newUser);
	}
}
