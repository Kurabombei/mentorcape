import {Component, Input} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {BoardService} from "../board.service";
import {MatDialog} from "@angular/material/dialog";
import {TaskDialogComponent} from "../dialogs/task-dialog/task-dialog.component";
import {Card} from "../board.model";

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.scss']
})
export class BoardComponent {

	@Input() board: any;

	constructor(private boardService: BoardService, private dialog: MatDialog) {
	}

	taskDrop(event: CdkDragDrop<string[]>) {
		// moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
		if (event.previousContainer === event.container) {
			moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
			this.boardService.updateTasks(this.board.id, this.board.tasks);

		} else {
			transferArrayItem(
				event.previousContainer.data,
				event.container.data,
				event.previousIndex,
				event.currentIndex,
			);
		}
	}


	openDialog(task?: Card, idx?: number): void {
		const newTask = {label: 'purple'};
		const dialogRef = this.dialog.open(TaskDialogComponent, {
			width: '500px',
			data: task
				? {task: {...task}, isNew: false, boardId: this.board.id, idx}
				: {task: newTask, isNew: true}
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (result.isNew) {
					this.boardService.updateTasks(this.board.id, [
						...this.board.tasks,
						result.task
					]);
				} else {
					const update = this.board.tasks;
					update.splice(result.idx, 1, result.task);
					this.boardService.updateTasks(this.board.id, this.board.tasks);
				}
			}
		});
	}

	handleDelete() {
		this.boardService.deleteBoard(this.board.id);
	}
}
