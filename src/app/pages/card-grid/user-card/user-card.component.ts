import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../core/models/user";
import {MentorService} from "../../../services/mentor.service";
import {UtilService} from "../../../services/util.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

	@Input() user: User;
	@Input() isMentor: boolean;


	constructor(private mentorService: MentorService, private utils: UtilService, private notificationService: NotificationService) {
	}

	ngOnInit(): void {
	}

	navigateToUrl(socialLink?: string) {
		this.utils.navigateToUrl(socialLink);
	}

	sendMentorRequest() {
		this.notificationService.addSuccess('A mentor request was sent!')
	}
}
