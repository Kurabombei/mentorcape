import {Component, OnDestroy, OnInit} from '@angular/core';
import {DatabaseQueryService} from "../../../services/database-query.service";
import {Subscription} from "rxjs";
import {User} from "../../../core/models/user";

@Component({
	selector: 'app-students',
	templateUrl: './students.component.html',
	styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
	students: User[] = [];

	private sub: Subscription = new Subscription();

	constructor(private dbService: DatabaseQueryService) {
	}

	ngOnInit(): void {
		this.sub = this.dbService
			.getAllStudents()
			.subscribe((students: any) => (this.students = students));
		console.log(this.students);
		console.dir(this.students);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
