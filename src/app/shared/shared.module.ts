import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShellComponent} from './shell/shell.component';

import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {DeleteButtonComponent} from './delete-button/delete-button.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {FormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {LogoutDirective} from "./directives/logout.directive";

const components = [ShellComponent, DeleteButtonComponent, LogoutDirective];

const modules = [
	CommonModule,
	MatButtonModule,
	MatToolbarModule,
	MatButtonToggleModule,
	MatIconModule,
	LayoutModule,
	MatSidenavModule,
	MatListModule,
	MatMenuModule,
	MatCardModule,
	MatSelectModule,
	MatOptionModule,
	MatFormFieldModule,
	MatInputModule,
	MatSnackBarModule,
	RouterModule
];

@NgModule({
	declarations: [...components],
	imports: [...modules, MatSlideToggleModule, FormsModule],
	exports: [
		...components,
		...modules,
	]
})
export class SharedModule {
}
