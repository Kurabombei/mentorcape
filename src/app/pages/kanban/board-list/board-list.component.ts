import {Component, OnDestroy, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Subscription} from 'rxjs';
import {Column} from '../board.model';
import {BoardService} from '../board.service';
import {MatDialog} from "@angular/material/dialog";
import {BoardDialogComponent} from "../dialogs/board-dialog/board-dialog.component";

@Component({
	selector: 'app-board-list',
	templateUrl: './board-list.component.html',
	styleUrls: ['./board-list.component.scss']
})
export class BoardListComponent implements OnInit, OnDestroy {
	boards: Column[] = [];
	sub: Subscription = new Subscription();
	todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

	done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

	constructor(public boardService: BoardService, public dialog: MatDialog) {
	}

	ngOnInit() {
		this.sub = this.boardService
			.getUserBoards()
			.subscribe(boards => (this.boards = boards));
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	drop(event: CdkDragDrop<string[]>) {
		moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
		this.boardService.sortBoards(this.boards);
	}

	openBoardDialog(): void {
		const dialogRef = this.dialog.open(BoardDialogComponent, {
			width: '400px',
			data: {}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.boardService.addBoardColumn(result).then(r => {
					console.log(r);
				})
			}
		});
	}

}
