import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
	public isEdited: boolean = false;
	public form: FormGroup;

	constructor(private fb: FormBuilder, public auth: AuthService, public afAuth: AngularFireAuth) {
		this.form = this.fb.group({
			email: ['', [Validators.email, Validators.required]],
			age: ['', []],
			location: ['', []],
			languages: ['', []],
			students: [[], []],
			mentors: [[], []],
		})
		this.form.disable();
	}

	ngOnInit(): void {
		this.auth.user.subscribe((userData) => {
			if (userData) {
				this.form.patchValue({
					email: userData.email,
					age: userData.age,
					location: userData.location,
					languages: userData.languages,
					students: userData.students,
					mentors: userData.mentors,
				})
			}
		})
	}

	public _f(property: string) {
		return this.form.get(property);
	}

	startEdit() {
		this.isEdited = true;
		this.form.enable();
	}

	cancelEdit() {
		this.isEdited = false;
		this.form.disable();
	}

	save() {
		// save edited info
		this.cancelEdit();
	}

	getErrorMessage() {
		if (this._f('email')?.hasError('required')) {
			return 'You must enter a value';
		}

		return this._f('email')?.hasError('email') ? 'Not a valid email' : '';
	}
}
