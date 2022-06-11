import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Card} from "../../board.model";

@Component({
	selector: 'app-board-item',
	templateUrl: './board-item.component.html',
	styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {

	@Input() item: Card;
	@Output() emitText: EventEmitter<{ id: number; text: string }> = new EventEmitter();
	@Output() emitCardItem: EventEmitter<{ card: Card; increase: boolean }> = new EventEmitter();
	@Output() emitDeleteCard: EventEmitter<Card> = new EventEmitter();

	commentInput = ''
	open = false;

	constructor() {
	}

	ngOnInit(): void {
	}

	onOpenComment() {
		this.open = !this.open
	}

	onCommentTextEmit(id: number) {
		this.emitText.emit({id, text: this.commentInput});
		this.commentInput = ''
	}

	onCardItemEmit(card: any, increase: boolean) {
		this.emitCardItem.emit({card, increase});
	}

	onCardDelete(card: any) {
		this.emitDeleteCard.emit(card)
	}
}
