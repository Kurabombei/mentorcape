import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardGridRoutingModule} from './card-grid-routing.module';
import {StudentsComponent} from './students/students.component';
import {MentorsComponent} from './mentors/mentors.component';
import {BriefUserCardComponent} from './brief-user-card/brief-user-card.component';
import {SharedModule} from "../../shared/shared.module";
import {UserCardComponent} from './user-card/user-card.component';

const components = [
	StudentsComponent,
	MentorsComponent,
	BriefUserCardComponent,
	UserCardComponent]

@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		CardGridRoutingModule,
		SharedModule
	],
	exports: [
		...components
	]
})
export class CardGridModule {
}
