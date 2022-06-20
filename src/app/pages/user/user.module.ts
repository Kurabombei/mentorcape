import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from "@angular/forms";

import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from "../../shared/shared.module";

import {LoginPageComponent} from './login-page/login-page.component';
import {GoogleSigninDirective} from './google-signin.directive';
import {EmailLoginComponent} from './email-login/email-login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BecomeMentorComponent} from './user-profile/become-mentor/become-mentor.component';
import {MentorFormComponent} from './user-profile/mentor-form/mentor-form.component';
import {MatStepperModule} from "@angular/material/stepper";
import {StudentDetailComponent} from './student-detail/student-detail.component';
import {MentorDetailComponent} from './mentor-detail/mentor-detail.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {KanbanModule} from "../kanban/kanban.module";
import {BriefUserInfoComponent} from './brief-user-info/brief-user-info.component';
import {MentorDashboardModule} from "../mentor-dashboard/mentor-dashboard.module";


@NgModule({
	declarations: [
		LoginPageComponent,
		GoogleSigninDirective,
		EmailLoginComponent,
		UserProfileComponent,
		BecomeMentorComponent,
		MentorFormComponent,
		StudentDetailComponent,
		MentorDetailComponent,
		BriefUserInfoComponent,
	],
	imports: [
		CommonModule,
		UserRoutingModule,
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		MatStepperModule,
		MatGridListModule,
		KanbanModule,
		MentorDashboardModule,
	],
	exports: [],
	providers: [
		FormBuilder
	]
})
export class UserModule {
}
