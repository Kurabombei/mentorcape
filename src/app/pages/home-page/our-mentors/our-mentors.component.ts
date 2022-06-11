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
	mentors: User[] = [
		{
			uid: 'asd',
			email: 'aasd',

			isMentor: true,

			displayName: 'John Travolta',
			position: 'Actor',
			location: 'The USA',
			photoURL: 'https://akns-images.eonline.com/eol_images/Entire_Site/2015122/rs_634x1024-150222213607-634.John-Travolta-Academy-Awards.ms.022215.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top',
			socialLink: 'https://calendly.com/volos-work/30min?month=2022-06'
		},
		{
			uid: 'asd',
			email: 'aasd',

			isMentor: true,

			displayName: 'John Doe',
			position: 'Actor',
			location: 'The USA',
			photoURL: 'https://akns-images.eonline.com/eol_images/Entire_Site/2015122/rs_634x1024-150222213607-634.John-Travolta-Academy-Awards.ms.022215.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top',
			socialLink: 'https://calendly.com/volos-work/30min?month=2022-06'
		}, {
			uid: 'asd',
			email: 'aasd',

			isMentor: true,

			displayName: 'John Travolta',
			position: 'Actor',
			location: 'The USA',
			photoURL: 'https://akns-images.eonline.com/eol_images/Entire_Site/2015122/rs_634x1024-150222213607-634.John-Travolta-Academy-Awards.ms.022215.jpg?fit=around%7C634:1024&output-quality=90&crop=634:1024;center,top',
			socialLink: 'https://calendly.com/volos-work/30min?month=2022-06'
		}
	];

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
