import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BoardListComponent} from "./board-list/board-list.component";
import {TrelloBoardListComponent} from "./trello-board-list/trello-board-list.component";

const routes: Routes = [
	{path: 'old-boards', component: BoardListComponent},
	{path: '', component: TrelloBoardListComponent},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class KanbanRoutingModule {
}
