import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-become-mentor',
	templateUrl: './become-mentor.component.html',
	styleUrls: ['./become-mentor.component.scss']
})
export class BecomeMentorComponent implements OnInit {

	constructor() {
	}

	ngOnInit(): void {
	}

	becomeMentor() {
		console.log('Gonna become a mentor some day!');
	}
}
