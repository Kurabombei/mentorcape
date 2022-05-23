import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StudentsComponent} from "./students/students.component";
import {MentorsComponent} from "./mentors/mentors.component";

const routes: Routes = [
	{path: 'students', component: StudentsComponent},
	{path: 'mentors', component: MentorsComponent},
	{path: '/**', redirectTo: 'mentors'}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CardGridRoutingModule {
}
