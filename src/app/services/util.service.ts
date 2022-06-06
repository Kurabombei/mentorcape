import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	constructor() {
	}

	navigateToUrl(socialLink?: string) {
		if (!!socialLink) {
			window.open(socialLink, "_blank");
		}
	}
}
