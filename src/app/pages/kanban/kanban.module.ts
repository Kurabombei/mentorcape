import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {KanbanRoutingModule} from './kanban-routing.module';
import {BoardListComponent} from './board-list/board-list.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {BoardComponent} from './board/board.component';
import {TrelloBoardListComponent} from './trello-board-list/trello-board-list.component';
import {BoardItemComponent} from './trello-board-list/board-item/board-item.component';
import {CommentItemComponent} from './trello-board-list/comment-item/comment-item.component';
import {ColorPanelComponent} from './trello-board-list/color-panel/color-panel.component';
import {DialogComponent} from './dialogs/dialog/dialog.component';
import {DialogBodyComponent} from './dialogs/dialog-body/dialog-body.component';


@NgModule({
	declarations: [
		BoardListComponent,
		BoardComponent,
		TrelloBoardListComponent,
		BoardItemComponent,
		CommentItemComponent,
		ColorPanelComponent,
		DialogComponent,
		DialogBodyComponent,
	],
	imports: [
		CommonModule,
		KanbanRoutingModule,
		SharedModule,
		FormsModule,
		DragDropModule,
		MatDialogModule,
		MatButtonToggleModule
	], exports: [
		TrelloBoardListComponent,
		BoardItemComponent,
		CommentItemComponent,
		ColorPanelComponent,
		DialogComponent
	]
})
export class KanbanModule {
}
