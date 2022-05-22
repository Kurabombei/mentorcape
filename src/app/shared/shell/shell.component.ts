import {Component, EventEmitter, Output} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from "../../services/auth.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
	selector: 'app-shell',
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
	@Output()
	readonly darkModeSwitched = new EventEmitter<boolean>();

	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
		.pipe(
			map(result => result.matches),
			shareReplay()
		);
	isLoggedIn: boolean = false;
	isChecked: boolean = false;

	constructor(private breakpointObserver: BreakpointObserver, public auth: AuthService) {
		this.isLoggedIn = this.auth.isLoggedIn; // todo refactor
	}

	onDarkModeSwitch({checked}: MatSlideToggleChange) {
		this.darkModeSwitched.emit(checked);
	}
}
