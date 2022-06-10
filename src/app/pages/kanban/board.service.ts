import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {Board, Card, Column, Comment, Task} from './board.model';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {BehaviorSubject} from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class BoardService {
	private initBoard = [
		{
			id: 1,
			title: 'To Do',
			color: '#009886',
			list: [
				{
					id: 1,
					text: 'Example card item',
					like: 1,
					comments: [
						{
							id: 1,
							text: 'Some comment'
						}
					]
				},
			]
		},
	]
	private board: Column[] = this.initBoard
	private board$ = new BehaviorSubject<Column[]>(this.initBoard)

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
	}

	/**
	 * Creates a new board for the current user
	 */
	async createBoard(data: Board) {
		const user = await this.afAuth.currentUser;
		return this.db.collection('boards').add({
			...data,
			uid: user?.uid,
			tasks: [{description: 'Initial new task!', label: 'yellow'}]
		});
	}

	async createDefaultTasks() {
		let boards: Board[] = [
			{
				title: 'To do',
				priority: 0,
				tasks: [{description: 'Drag and drop me!', label: 'yellow'}]
			},
			{
				title: 'In progress',
				priority: 1,
				tasks: [{description: 'Drag and drop me!', label: 'blue'}]
			},
			{
				title: 'Done',
				priority: 2,
				tasks: [{description: 'Drag and drop me!', label: 'purple'}]
			}]

		const db = firebase.firestore();
		const batch = db.batch();
		const refs = boards.map(b => db.collection('boards').doc());
		refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
		batch.commit();

		const user = await this.afAuth.currentUser;
		return this.db.collection('boards').add({
			title: 'To do',
			priority: 0,
			tasks: [{description: 'To get to know MentorCape.'}]
		})
	}

	/**
	 * Delete board
	 */
	deleteBoard(boardId: string) {
		return this.db
			.collection('boards')
			.doc(boardId)
			.delete();
	}

	/**
	 * Updates the tasks on board
	 */
	updateTasks(boardId: string, tasks: Task[]) {
		return this.db
			.collection('boards')
			.doc(boardId)
			.update({tasks});
	}

	/**
	 * Remove a specific task from the board
	 */
	removeTask(boardId: string, task: Task) {
		return this.db
			.collection('boards')
			.doc(boardId)
			.update({
				tasks: firebase.firestore.FieldValue.arrayRemove(task)
			});
	}

	/**
	 * Get all boards owned by current user
	 */
	getUserBoards() {
		return this.afAuth.authState.pipe(
			switchMap(user => {
				if (user) {
					return this.db
						.collection<Board>('boards', ref =>
							ref.where('uid', '==', user.uid).orderBy('priority')
						)
						.valueChanges({idField: 'id'});
				} else {
					return [];
				}
			})
		);
	}

	/**
	 * Run a batch write to change the priority of each board for sorting
	 */
	sortBoards(boards: Board[]) {
		const db = firebase.firestore();
		const batch = db.batch();
		const refs = boards.map(b => db.collection('boards').doc(b.id));
		refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
		batch.commit();
	}

	getBoard$() {
		return this.board$.asObservable()
	}

	changeColumnColor(color: string, columnId: number) {
		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				column.color = color;
			}
			return column;
		});
		this.board$.next([...this.board]);
	}

	addColumn(title: string) {
		const newColumn: Column = {
			id: Date.now(),
			title: title,
			color: '#009886',
			list: [],
		};

		this.board = [...this.board, newColumn];
		this.board$.next([...this.board]);
	}

	addCard(text: string, columnId: number) {
		const newCard: Card = {
			id: Date.now(),
			text,
			like: 0,
			comments: [],
		};

		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				column.list = [newCard, ...column.list];
			}
			return column;
		});

		this.board$.next([...this.board]);
	}

	deleteColumn(columnId: number) {
		this.board = this.board.filter((column: Column) => column.id !== columnId);
		this.board$.next([...this.board]);
	}

	deleteCard(cardId: number, columnId: number) {
		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				column.list = column.list.filter((card: Card) => card.id !== cardId);
			}
			return column;
		});

		this.board$.next([...this.board]);
	}

	changeLike(cardId: number, columnId: number, increase: boolean) {
		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				const list = column.list.map((card: Card) => {
					if (card.id === cardId) {
						if (increase) {
							card.like++;
						} else {
							if (card.like > 0) {
								card.like--;
							}
						}
					}
					return card;
				});

				column.list = list;
				return column;
			} else {
				return column;
			}
		});

		this.board$.next([...this.board]);
	}

	addComment(columnId: number, cardId: number, text: string) {
		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				const list = column.list.map((card: Card) => {
					if (card.id === cardId) {
						const newComment = {
							id: Date.now(),
							text,
						};
						card.comments = [newComment, ...card.comments];
					}
					return card;
				});

				column.list = list;
			}
			return column;
		});

		this.board$.next([...this.board]);
	}

	deleteComment(columnId: number, itemId: number, commentId: any) {
		this.board = this.board.map((column: Column) => {
			if (column.id === columnId) {
				const list = column.list.map((item) => {
					if (item.id === itemId) {
						item.comments = item.comments.filter((comment: Comment) => {
							return comment.id !== commentId
						})
					}
					return item
				})
				column.list = list
			}
			return column
		})
		this.board$.next([...this.board])
	}
}
