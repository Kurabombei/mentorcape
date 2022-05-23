import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./pages/user/auth.guard";
import {UserProfileComponent} from "./pages/user/user-profile/user-profile.component";

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
	},
	{path: 'user-profile', component: UserProfileComponent},
	{
		path: 'login', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
	},
	{
		path: 'card-grid', loadChildren: () => import('./pages/card-grid/card-grid.module').then(m => m.CardGridModule)
	},
	{
		path: 'kanban',
		loadChildren: () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
