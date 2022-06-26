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

			displayName: 'John Brown',
			position: 'Front-end dev at Stobox',
			location: 'The USA, Washington',
			photoURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHdLZAJzeEA2iYjsrN4CEXrg8ATQ1tB04blQ&usqp=CAU',
			socialLink: 'https://calendly.com/ivan-volos/intro-call-with-ivan-volos-clone'
		},
		{
			uid: 'asd',
			email: 'aasd',

			isMentor: true,

			displayName: 'Jack Volos',
			position: 'Blockchain developer at Stobox',
			location: 'Ukraine, Lviv',
			photoURL: 'https://lh3.googleusercontent.com/a-/AOh14GjQT86sqMj8PVl34d6hTzAmaWXzYr1WR6kPElYE=s96-c',
			socialLink: 'https://calendly.com/ivan-volos/intro-call-with-ivan-volos-clone'
		}, {
			uid: 'asd',
			email: 'aasd',

			isMentor: true,

			displayName: 'Jake Jillenhall',
			position: 'Java Developer',
			location: 'The USA, California',
			photoURL: 'https://oodp.ca/media/tutor-8.jpg',
			socialLink: 'https://calendly.com/ivan-volos/intro-call-with-ivan-volos-clone'
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
