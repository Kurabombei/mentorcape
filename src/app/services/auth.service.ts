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

	async createUserWithEmailAndPassword(email: string, password: string) {
		return await this.afAuth.createUserWithEmailAndPassword(email, password).then(cred => {
			console.log('cred', cred);
			const newUser = new User();

			if (cred) {
				if (cred.user?.email) {
					newUser.email = cred.user?.email;
				}

				this.db.collection('users').doc(cred.user?.uid).set(newUser);
			}
		}, err => console.log('Error. Could not create User.', err));
	}

	async sendPasswordResetEmail(email: string) {
		return await this.afAuth.sendPasswordResetEmail(email);
	}

	signInWithPopup() {
		return this.afAuth.signInWithPopup(new firebaseAuth.GoogleAuthProvider())
			.then((credential) => {
				this.updateUserData(credential.user);
			});
	}

	private updateUserData(user: any) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);

		const newUser: User = {
			uid: user.uid,
			email: user.email,
			displayName: user.displayName,
			photoURL: user.photoURL
		}

		return userRef.set(newUser);
	}
}
