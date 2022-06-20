import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../core/models/user";

@Component({
	selector: 'app-brief-user-info',
	templateUrl: './brief-user-info.component.html',
	styleUrls: ['./brief-user-info.component.scss']
})
export class BriefUserInfoComponent implements OnInit {
	@Input('user') user: User;

	constructor() {
	}

	ngOnInit(): void {
	}

}
