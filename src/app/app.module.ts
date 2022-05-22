import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {SharedModule} from "./shared/shared.module";
import {HomePageComponent} from './pages/home-page/home-page.component';

import {environment} from "../environments/environment";

import {AngularFireModule} from "@angular/fire/compat";
import {FirestoreModule} from "@angular/fire/firestore";
import {AuthModule} from "@angular/fire/auth";
import {BoardDialogComponent} from './pages/kanban/dialogs/board-dialog/board-dialog.component';
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {TaskDialogComponent} from './pages/kanban/dialogs/task-dialog/task-dialog.component';
import {HomePageModule} from "./pages/home-page/home-page.module";


@NgModule({
	declarations: [
		AppComponent,
		HomePageComponent,
		BoardDialogComponent,
		TaskDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		SharedModule,
		AngularFireModule.initializeApp(environment.firebase),
		FirestoreModule,
		AuthModule,
		FormsModule,
		MatDialogModule,
		HomePageModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
