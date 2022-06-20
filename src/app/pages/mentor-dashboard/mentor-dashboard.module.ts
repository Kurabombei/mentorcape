import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MentorDashboardRoutingModule} from './mentor-dashboard-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';

import {SharedModule} from "../../shared/shared.module";
import {DashboardStudentsComponent} from './dashboard-students/dashboard-students.component';
import {DashboardStudentTasksComponent} from './dashboard-student-tasks/dashboard-student-tasks.component';
import {
	DashboardMentorAccomplishementsComponent
} from './dashboard-mentor-accomplishements/dashboard-mentor-accomplishements.component';


@NgModule({
	declarations: [DashboardComponent, DashboardStudentsComponent, DashboardStudentTasksComponent, DashboardMentorAccomplishementsComponent],
	exports: [
		DashboardMentorAccomplishementsComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		MentorDashboardRoutingModule,
		MatGridListModule
	]
})
export class MentorDashboardModule {
}
