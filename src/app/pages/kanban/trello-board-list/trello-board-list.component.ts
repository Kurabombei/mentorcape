import {Component, Input, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../board.service";
import {Card} from "../board.model";
import {BoardDialogComponent} from "../dialogs/board-dialog/board-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../services/notification.service";

@Component({
	selector: 'app-trello-board-list',
	templateUrl: './trello-board-list.component.html',
	styleUrls: ['./trello-board-list.component.scss']
})
export class TrelloBoardListComponent implements OnInit {
	@Input('selectedID') userUID: string;
	public boards: Array<any>;

	constructor(
		public boardService: BoardService,
		public notificationService: NotificationService,
		public dialog: MatDialog
	) {
	}

	ngOnInit(): void {
	}

	onColorChange(color: string, columnId: string) {
		this.boardService.changeColumnColor(color, columnId)
	}

	onAddCard(text: string, columnId: string) {
		if (text) {
			console.log(text);
			this.boardService.addCard(text, columnId)
		}
	}

	onDeleteColumn(columnId: string) {
		this.boardService.deleteColumn(columnId)
	}

	onDeleteCard(card: Card, columnId: string) {
		this.boardService.deleteCard(card, columnId)
	}

	onChangeLike(event: { card: any, increase: boolean }, columnId: string) {
		const {card: {id}, increase} = event
		this.boardService.changeLike(id, columnId, increase)
	}

	onAddComment(event: { id: number, text: string }, columnId: string) {
		this.boardService.addComment(columnId, event.id, event.text)
	}

	onDeleteComment(comment: { id: any; }, columnId: string, item: { id: number; }) {
		this.boardService.deleteComment(columnId, item.id, comment.id)
	}

	drop(event: CdkDragDrop<Card[], any>) {
		if (event.previousContainer === event.container) {
			moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
		} else {
			transferArrayItem(event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex);
		}
	}

	openBoardDialog(event: any): void {
		if (event) {
			const dialogRef = this.dialog.open(BoardDialogComponent, {
				width: '400px',
				data: {}
			});

			dialogRef.afterClosed().subscribe((result: any) => {
				if (result) {
					this.boardService.addBoardColumn(result).then(r => {
						console.log(r);
						this.notificationService.addSuccess(`Board ${result} is successfully added!`);
					}, err => {
						console.log(err);
						this.notificationService.addError(`Board ${result} was not added! ${err}`);
					});
				}
			});
		}
	}
}
