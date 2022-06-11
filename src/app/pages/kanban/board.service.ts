import {Injectable} from '@angular/core';
import {switchMap} from 'rxjs/operators';
import {Card, Column, Comment} from './board.model';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat/app";
import {BehaviorSubject, Observable, Subscription} from "rxjs";


@Injectable({
	providedIn: 'root'
})
export class BoardService {
	private initBoard = [
		{
			id: 'ASDASDASD2DADW',
			uid: 'ASDASDASD2DADW',
			title: 'To Do',
			color: '#009886',
			priority: 1,
			tasks: [
				{
					id: 1,
					description: 'Example card item',
					label: 'yellow',
					like: 1,
					comments: [
						{
							id: 1,
							uid: 'ASDASDASD2DADW',
							text: 'Some comment'
						}
					]
				},
			]
		},
		{
			id: 'ASDASDASD2DADW',
			uid: 'ASDASDASD2DADW',
			title: 'In progress',
			color: '#009886',
			priority: 2,
			tasks: [
				{
					id: 2,
					description: 'Example card item',
					label: 'yellow',
					like: 1,
					comments: [
						{
							id: 1,
							uid: 'ASDASDASD2DADW',
							text: 'Some comment'
						}
					]
				},
			]
		},
		{
			id: '3332ASDASDAS',
			uid: '3332ASDASDAS',
			title: 'Done',
			color: '#009886',
			priority: 3,
			tasks: [
				{
					id: 3,
					description: 'Example card item',
					label: 'yellow',
					like: 1,
					comments: [
						{
							id: 1,
							uid: '3asASDASsada',
							text: 'Some comment'
						}
					]
				},
			]
		},
	]
	private boards: Column[] = [];
	private board$ = new BehaviorSubject<Column[]>([]);
	private sub: Subscription = new Subscription();

	constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
		let boardsSub = this.getUserBoards()
			.subscribe(boards => {
				console.log('boards from back')
				this.boards = boards;
				this.changeBoard$ = [...this.boards];
			});

		this.sub.add(boardsSub);
	}

	set changeBoard$(value: Column[]) {
		this.board$.next(value);
		console.log(`Board state was changed. Emitting`);
		console.dir(value);
	}

	/**
	 * Creates a new board for the current user
	 */
	async createBoard(data: Column) {
		const user = await this.afAuth.currentUser;
		return this.db.collection('boards').add({
			...data,
			uid: user?.uid,
			tasks: [{description: 'Initial new task!', label: 'yellow'}]
		});
	}

	async createDefaultTasks() {
		let boards: Column[] = [
			{
				id: '3332ASDASDAS',
				uid: '3332ASDASDAS',
				color: '#009886',
				title: 'Done',
				priority: 0,
				tasks: [{id: 1001, description: 'Drag and drop me!', label: 'yellow'}]
			},
			{
				id: '3332ASDASDAS',
				uid: '3332ASDASDAS',
				color: '#009886',
				title: 'In progress',
				priority: 1,
				tasks: [{id: 1001, description: 'Drag and drop me!', label: 'blue'}]
			},
			{
				id: '3332ASDASDAS',
				uid: '3332ASDASDAS',
				color: '#009886',
				title: 'Done',
				priority: 2,
				tasks: [{id: 1001, description: 'Drag and drop me!', label: 'purple'}]
			}]

		const db = firebase.firestore();
		const batch = db.batch();
		const refs = boards.map(b => db.collection('boards').doc());
		refs.forEach((ref, idx) => batch.update(ref, boards[idx]));
		batch.commit();
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
	updateTasks(boardId: string, tasks: Card[]) {
		return this.db
			.collection('boards')
			.doc(boardId)
			.update({tasks});
	}

	/**
	 * Remove a specific task from the board
	 */
	removeTask(boardId: string, task: Card) {
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
						.collection<Column>('boards', ref =>
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
	sortBoards(boards: Column[]) {
		const db = firebase.firestore();
		const batch = db.batch();
		const refs = boards.map(b => db.collection('boards').doc(b.id));
		refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
		batch.commit();
	}

	getBoard$(): Observable<Column[]> {
		return this.board$.asObservable();
	}

	changeColumnColor(color: string, columnId: string) {
		return this.db.collection('boards').doc(columnId).update({color})
	}

	async addBoardColumn(title: string) {

		const user = await this.afAuth.currentUser;
		let ref = this.db.collection('boards').doc().get();

		const newColumn: Column = {
			id: `${ref}`,
			uid: user!.uid,
			title: title,
			color: '#009886',
			priority: this.boards.length,
			tasks: []
		};

		this.boards = [...this.boards, newColumn];
		this.changeBoard$ = [...this.boards];
		return this.db.collection('boards').add(newColumn);
	}

	async addCard(description: string, columnId: string) {
		const newCard = {
			id: 0,
			description: description,
			label: 'blue',
			like: 1,
			comments: [{
				id: 0,
				uid: '0',
				text: 'First comment',
			}]
		}
		let selectedBoard = this.boards.filter(board => board.id == columnId)[0];
		if (!selectedBoard) {
			return 0;
		}


		console.log('OLD TASKS', selectedBoard.tasks)
		const tasks: Card[] = [newCard, ...selectedBoard.tasks];
		console.log('new TASKS', tasks)

		return this.db.collection('boards').doc(columnId)
			.update({tasks})
		// const tasks: Card[] = this.board.filter((board) => board.id === columnId).map((board) => board.tasks[0])
		//
		// const newCard = {
		// 	id: Math.floor(Math.random() * 1000),
		// 	description: description,
		// 	like: 0,
		// 	label: 'blue',
		// 	comments: [],
		// };
		//
		// this.board = this.board.map((column: Column) => {
		// 	if (column.id === columnId) {
		// 		column.tasks = [newCard, ...column.tasks];
		// 	}
		// 	return column;
		// });
		// console.log([newCard, ...tasks]);
		//
		// this.changeBoard$ = [...this.board];
		//
		// console.log('COLUMNID', columnId);
		// console.log('this.board', this.board);
		// console.dir(this.board);
		// console.log('NEW CARD', newCard);
		// console.log('TASKS', tasks);
		// if (!!tasks) {
		// 	return this.db
		// 		.collection('boards')
		// 		.doc(columnId)
		// 		.update({tasks: [newCard, ...tasks]});
		// } else {
		// 	return this.db
		// 		.collection('boards')
		// 		.doc(columnId)
		// 		.update({tasks: [newCard]});
		// }
	}

	deleteColumn(columnId: string) {
		this.boards = this.boards.filter((column: Column) => column.id !== columnId);
		this.changeBoard$ = [...this.boards];
		return this.deleteBoard(columnId);
	}

	deleteCard(card: Card, columnId: string) {
		return this.removeTask(columnId, card);
	}

	changeLike(cardId: number, columnId: string, increase: boolean) {
		this.boards = this.boards.map((column: Column) => {
			if (column.id === columnId) {
				const taskList = column.tasks.map((card: Card) => {
					if (!!card.like && card.id === cardId) {
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

				column.tasks = taskList;
				return column;
			} else {
				return column;
			}
		});

		this.changeBoard$ = [...this.boards];
	}

	addComment(columnId: string, cardId: number, text: string) {
		this.boards = this.boards.map((column: Column) => {
			if (column.id === columnId) {
				const taskList = column.tasks.map((card: Card) => {
					if (card.id === cardId) {
						const newComment = {
							id: Date.now(),
							text,
						};
						// @ts-ignore
						card.comments = [newComment, ...card.comments];
					}
					return card;
				});

				column.tasks = taskList;
			}
			return column;
		});

		this.changeBoard$ = [...this.boards];
	}

	deleteComment(columnId: string, itemId: number, commentId: any) {
		this.boards = this.boards.map((column: Column) => {
			if (column.id === columnId) {
				const taskList = column.tasks.map((item) => {
					if (!!item.comments && item.id === itemId) {
						item.comments = item.comments.filter((comment: Comment) => {
							return comment.id !== commentId
						})
					}
					return item
				})
				column.tasks = taskList
			}
			return column
		})
		this.board$.next([...this.boards])
	}
}
