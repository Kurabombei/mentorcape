import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-color-panel',
	templateUrl: './color-panel.component.html',
	styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
	@Input() comment: any;

	@Output() emitComment: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}

	onCommentEmit(comment: Comment) {
		this.emitComment.emit(comment);
	}

}
