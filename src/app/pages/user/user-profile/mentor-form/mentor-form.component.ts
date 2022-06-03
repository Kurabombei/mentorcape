import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StepperOrientation} from "@angular/cdk/stepper";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
	selector: 'app-mentor-form',
	templateUrl: './mentor-form.component.html',
	styleUrls: ['./mentor-form.component.scss']
})
export class MentorFormComponent implements OnInit {
	stepperOrientation: Observable<StepperOrientation>;

	personalForm: FormGroup;
	mentorForm: FormGroup;
	socialsForm: FormGroup;

	constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
		this.stepperOrientation = breakpointObserver
			.observe('(min-width: 800px)')
			.pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
	}

	ngOnInit(): void {
		this.personalForm = this.fb.group({
			age: [null, []],
			location: ['', []],
			languages: [[], []],
			description: ['', []],
		});
		this.mentorForm = this.fb.group({
			position: ['', [Validators.required, Validators.minLength(3)]],
			role: ['', []],
			industry: ['', []],
			categories: [[], []],
		});
		this.socialsForm = this.fb.group({
			socialLink: ['', [Validators.pattern(/(calendly.com)/)]],
		});
	}

	submit() {
		let personalData = this.personalForm.value;
		let mentorshipData = this.mentorForm.value;
		let socialData = this.socialsForm.value;
		console.log('ALL DATA SUBMITTED');
		console.dir({...personalData, ...mentorshipData, ...socialData});
		// Navigate to thank you page for mentor flag.
	}
}
