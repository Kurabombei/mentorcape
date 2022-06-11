import {Component} from '@angular/core';
import {map} from 'rxjs/operators';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	/** Based on the screen size, switch from standard to one column per row */
	cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
		map(({matches}) => {
			if (matches) {
				return [
					{title: 'My students', component: `<app-dashboard-students></app-dashboard-students>`, cols: 1, rows: 1},
					{title: 'Their tasks', component: `<app-dashboard-student-tasks></app-dashboard-student-tasks>`, cols: 1, rows: 1},
					{
						title: 'Accomplishements',
						component: `<app-dashboard-mentor-accomplishements></app-dashboard-mentor-accomplishements>`,
						cols: 1,
						rows: 1
					},

				];
			}

			return [
				{title: 'My students', component: `<app-dashboard-students></app-dashboard-students>`, cols: 1, rows: 2},
				{title: 'Their tasks', component: `<app-dashboard-student-tasks></app-dashboard-student-tasks>`, cols: 1, rows: 2},
				{
					title: 'Accomplishements',
					component: `<app-dashboard-mentor-accomplishements></app-dashboard-mentor-accomplishements>`,
					cols: 2,
					rows: 1
				},
			];
		})
	);

	constructor(private breakpointObserver: BreakpointObserver) {
	}
}
