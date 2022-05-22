import {Component, HostBinding} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	private isDarkTheme = false;

	@HostBinding('class')
	get ThemeMode() {
		return this.isDarkTheme ? 'theme-dark' : 'theme-light';
	}

	switchMode(isDarkMode: boolean) {
		this.isDarkTheme = isDarkMode;
	}
}
