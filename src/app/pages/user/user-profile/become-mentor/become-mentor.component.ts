import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
	selector: 'app-become-mentor',
	templateUrl: './become-mentor.component.html',
	styleUrls: ['./become-mentor.component.scss']
})
export class BecomeMentorComponent implements OnInit {

	constructor(private router: Router) {
	}

	ngOnInit(): void {
	}

	becomeMentor() {
		this.router.navigate(['/become-mentor']);
		console.log('Gonna become a mentor some day!');
	}
}
