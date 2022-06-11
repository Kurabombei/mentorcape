import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import * as firebaseAuth from "firebase/auth";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {User} from "../core/models/user";
import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {maleNames, surnames} from "../core/dev-test/usersDataset";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isLoggedIn: boolean = false;
	userId: string;
	user: Observable<User | null | undefined>;

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
		this.user = this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					this.userId = user.uid;
					return this.db.doc<User>(`users/${user.uid}`).valueChanges();
				} else {
					this.userId = '';
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
			if (credential.additionalUserInfo?.isNewUser) {
				this.setInitialUserData(credential.user, {displayName: displayName});
			}
		}).catch(function (error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
				console.log('The password is too weak.');
			} else {
				alert(errorMessage);
			}
			console.log(error);
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

	async createSampleUsers(numberOfUsers: number) {
		for (let i = 0; i < numberOfUsers; i++) {
			let displayName = `${maleNames[Math.floor(Math.random() * maleNames.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
			let email = `${displayName.split(' ').join('')}@test-mail.com`;
			let pass = `password${i + 1000}`;
			await this.createUserWithEmailAndPassword(email, pass, displayName);
		}
		console.log(`Added ${numberOfUsers} users to firestore.`);
	}

	private setInitialUserData<Tparams>(user: any, optionalParams?: Tparams) {
		const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.uid}`);
		if (!!userRef) {
			const newUser: any = {
				uid: user.uid,
				email: user.email,
				displayName: user.displayName,
				photoURL: (!!user.photoURL) ? user.photoURL : `https://robohash.org/${user.uid}`,
				isMentor: false
			}
			if (!!optionalParams) {
				Object.entries(optionalParams).forEach((param: Array<any>) => {
					newUser[param[0]] = param[1];
				})
			}

			return userRef.set(newUser);
		} else {
			return false;
		}
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
