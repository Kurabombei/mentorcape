import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";

@Component({
	selector: 'app-email-login',
	templateUrl: './email-login.component.html',
	styleUrls: ['./email-login.component.scss']
})
export class EmailLoginComponent implements OnInit {
	form: FormGroup;

	type: 'login' | 'signup' | 'reset' = 'signup';
	loading = false;

	serverMessage: string = '';
	private sampleUsers: any;

	constructor(private fb: FormBuilder, private auth: AuthService) {
		this.form = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(6)]],
			displayName: ['', [Validators.minLength(2)]],
			passwordConfirm: ['', []]
		});
	}

	get isLogin() {
		return this.type === 'login';
	}

	get isSignup() {
		return this.type === 'signup';
	}

	get isPasswordReset() {
		return this.type === 'reset';
	}

	get email() {
		return this.form.get('email');
	}

	get password() {
		return this.form.get('password');
	}

	get displayName() {
		return this.form.get('displayName');
	}

	get passwordConfirm() {
		return this.form.get('passwordConfirm');
	}

	get passwordDoesMatch() {
		if (this.type !== 'signup') {
			return true;
		} else {
			return this.password?.value === this.passwordConfirm?.value;
		}
	}

	ngOnInit(): void {
	}

	changeType(val: any) {
		this.type = val;
	}

	async onSubmit() {
		this.loading = true;

		const email = this.email?.value;
		const password = this.password?.value;
		const displayName = this.displayName?.value;

		try {
			if (this.isLogin) {
				await this.auth.loginWithEmail(email, password).then(res => {
					if (res) {
						this.auth.isLoggedIn = true;
					}
				}, error => {
					console.log('error', error);
					this.auth.isLoggedIn = false;
				});
			}
			if (this.isSignup) {
				await this.auth.createUserWithEmailAndPassword(email, password, displayName);
			}
			if (this.isPasswordReset) {
				await this.auth.sendPasswordResetEmail(email);
				this.serverMessage = 'Check your email';
			}
		} catch (err: any) {
			this.auth.isLoggedIn = false;
			this.serverMessage = err;
		}

		this.loading = false;
	}

	async createSampleUsers() {
		await this.auth.createSampleUsers(15);
	}
}
