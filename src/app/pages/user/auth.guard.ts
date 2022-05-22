import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {NotificationService} from "../../services/notification.service";
import {AuthService} from "../../services/auth.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private auth: AuthService, private notificationService: NotificationService, private router: Router) {
	}


	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Promise<boolean> {
		const user = await this.auth.user;
		const isLoggedIn = !!user;
		if (!isLoggedIn) {
			this.notificationService.authError();
			this.router.navigate(['/login']);
		}
		return isLoggedIn;
	}

}
