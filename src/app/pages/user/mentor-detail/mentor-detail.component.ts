import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DatabaseQueryService} from "../../../services/database-query.service";

@Component({
	selector: 'app-mentor-detail',
	templateUrl: './mentor-detail.component.html',
	styleUrls: ['./mentor-detail.component.scss']
})
export class MentorDetailComponent implements OnInit {

	public mentorInfo: any;
	private sub: Subscription = new Subscription();

	constructor(private activatedRoute: ActivatedRoute, private dbService: DatabaseQueryService) {
	}

	ngOnInit(): void {
		const routeSub = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
			console.log('params.get(\'uid\')!', params.get('uid')!);
			let studentSub = this.dbService
				.getStudentDetails(params.get('uid')!)
				.subscribe((studentRef) => {
					this.mentorInfo = studentRef?.data();
				});
			console.log('this.mentorInfo', this.mentorInfo);
			console.dir(this.mentorInfo);

			this.sub.add(studentSub);
		})

		this.sub.add(routeSub);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
