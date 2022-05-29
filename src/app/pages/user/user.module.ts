import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import {SharedModule} from "../../shared/shared.module";

import { LoginPageComponent } from './login-page/login-page.component';
import { GoogleSigninDirective } from './google-signin.directive';
import { EmailLoginComponent } from './email-login/email-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BecomeMentorComponent } from './user-profile/become-mentor/become-mentor.component';
import { MentorFormComponent } from './user-profile/mentor-form/mentor-form.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    GoogleSigninDirective,
    EmailLoginComponent,
    UserProfileComponent,
    BecomeMentorComponent,
    MentorFormComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
