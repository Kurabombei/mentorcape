import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../board.service";
import {Card} from "../board.model";

@Component({
	selector: 'app-trello-board-list',
	templateUrl: './trello-board-list.component.html',
	styleUrls: ['./trello-board-list.component.scss']
})
export class TrelloBoardListComponent implements OnInit {
	constructor(
		public boardService: BoardService
	) {
	}

	ngOnInit(): void {
		console.log('BOARD - INIT')
	}

	onColorChange(color: string, columnId: number) {
		this.boardService.changeColumnColor(color, columnId)
	}

	onAddCard(text: string, columnId: number) {
		if (text) {
			this.boardService.addCard(text, columnId)
		}
	}

	onDeleteColumn(columnId: number) {
		this.boardService.deleteColumn(columnId)
	}

	onDeleteCard(cardId: number, columnId: number) {
		this.boardService.deleteCard(cardId, columnId)
	}

	onChangeLike(event: { card: any, increase: boolean }, columnId: number) {
		const {card: {id}, increase} = event
		this.boardService.changeLike(id, columnId, increase)
	}

	onAddComment(event: { id: number, text: string }, columnId: number) {
		this.boardService.addComment(columnId, event.id, event.text)
	}

	onDeleteComment(comment: { id: any; }, columnId: number, item: { id: number; }) {
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

}