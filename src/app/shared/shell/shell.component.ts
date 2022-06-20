import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {MentorService} from "../../services/mentor.service";

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
	@Output()
	readonly darkModeSwitched = new EventEmitter<boolean>();

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	public isLoggedIn: boolean = false;
	public isChecked: boolean = false;
	public mentorState: string;
	private subscription: Subscription = new Subscription();

	constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService, private mentorService: MentorService) {
		this.isLoggedIn = this.auth.isLoggedIn;
	}

	ngOnInit(): void {
		const mentorSub = this.mentorService.getState()
			.subscribe(event => {
				console.log('event', event);
				this.mentorState = event;
			});

		this.subscription.add(mentorSub);
	}

	onDarkModeSwitch({checked}: MatSlideToggleChange) {
		this.darkModeSwitched.emit(checked);
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}
