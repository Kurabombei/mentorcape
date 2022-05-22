import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

	constructor(public auth: AuthService, public afAuth: AngularFireAuth) {
	}

	ngOnInit(): void {
	}

}
