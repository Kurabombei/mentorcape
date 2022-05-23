import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CardGridRoutingModule} from './card-grid-routing.module';
import {StudentsComponent} from './students/students.component';
import {MentorsComponent} from './mentors/mentors.component';
import {BriefUserCardComponent} from './brief-user-card/brief-user-card.component';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
	declarations: [
		StudentsComponent,
		MentorsComponent,
		BriefUserCardComponent
	],
	imports: [
		CommonModule,
		CardGridRoutingModule,
		SharedModule
	]
})
export class CardGridModule {
}
