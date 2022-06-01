import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/models/user";
import {Subscription} from "rxjs";
import {DatabaseQueryService} from "../../../services/database-query.service";

@Component({
	selector: 'app-mentors',
	templateUrl: './mentors.component.html',
	styleUrls: ['./mentors.component.scss']
})
export class MentorsComponent implements OnInit {
	mentors: User[] = [];

	private sub: Subscription = new Subscription();

	constructor(private dbService: DatabaseQueryService) {
	}

	ngOnInit(): void {
		this.sub = this.dbService
			.getAllMentors()
			.subscribe((mentors: any) => (this.mentors = mentors));

	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}
