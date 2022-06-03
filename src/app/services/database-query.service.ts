import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Board} from "../pages/kanban/board.model";
import {User} from "../core/models/user";
import {switchMap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
	providedIn: 'root'
})
export class DatabaseQueryService {

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
	}

	/** colletions in firestore:
	 * boards,
	 * users,
	 * **/

	//get all students
	getAllStudents() {
		return this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.db
						.collection<User>('users', ref =>
							ref.where('isMentor', '==', false).orderBy('displayName')
						)
						.valueChanges({idField: 'id'});
				} else {
					return [];
				}
			})
		);
	}

	// get all mentors
	getAllMentors() {
		return this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.db
						.collection<User>('users', ref =>
							ref.where('isMentor', '==', true).orderBy('displayName')
						)
						.valueChanges({idField: 'id'});
				} else {
					return [];
				}
			})
		);
	}

	// get 1 mentor details
	getMentorDetails(mentorId: string) {
		return this.db.collection('users').doc(mentorId)
	}

	// get all students by mentorId
	getStudentsById(mentorId: string) {
		return this.db.collection('users', studentRef =>
			studentRef.where('mentorId', '==', 'mentorId'))
	}

	// get all tasks by studentId
	getUserBoards(studentId: string) {
		const user = this.db.collection<User>('users').doc(studentId)
		if (user) {
			return this.db
				.collection<Board>('boards', ref =>
					ref.where('uid', '==', studentId).orderBy('priority')
				)
				.valueChanges({idField: 'id'});
		} else {
			return [];
		}
	}


	// Helper: Reads an array of IDs from a collection concurrently
	private async readIds(collection: any, ids: Array<any>) {
		const reads = ids.map(id => collection.doc(id).get());
		const result = await Promise.all(reads);
		return result.map(v => v.data());
	}
}
