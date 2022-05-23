import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	public isEdited: boolean = false;

	constructor(public auth: AuthService, public afAuth: AngularFireAuth) {
	}

	ngOnInit(): void {
	}

	startEdit() {
		this.isEdited = true;
	}

	cancelEdit() {
		this.isEdited = false;
	}

	save() {
		// save edited info
		this.cancelEdit();
	}
}
