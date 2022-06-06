import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/models/user";
import {Subscription} from "rxjs";
import {DatabaseQueryService} from "../../../services/database-query.service";
import {UtilService} from "../../../services/util.service";

@Component({
	selector: 'app-our-mentors',
	templateUrl: './our-mentors.component.html',
	styleUrls: ['./our-mentors.component.scss']
})
export class OurMentorsComponent implements OnInit {
	mentors: User[] = [];

	private sub: Subscription = new Subscription();

	constructor(private dbService: DatabaseQueryService, private utils: UtilService) {
	}

	ngOnInit(): void {
		this.sub = this.dbService
			.getTopMentors()
			.subscribe((mentors: Array<any>) => (this.mentors = mentors));

	}

	navigateToUrl(socialLink?: string) {
		this.utils.navigateToUrl(socialLink);
	}
}
