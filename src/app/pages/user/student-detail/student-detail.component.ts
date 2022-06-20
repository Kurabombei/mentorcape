import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {DatabaseQueryService} from "../../../services/database-query.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-student-detail',
	templateUrl: './student-detail.component.html',
	styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit, OnDestroy {
	public studentInfo: any;
	private sub: Subscription = new Subscription();

	constructor(private activatedRoute: ActivatedRoute, private dbService: DatabaseQueryService) {
	}

	ngOnInit(): void {
		const routeSub = this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
			console.log('params.get(\'uid\')!', params.get('uid')!);
			let studentSub = this.dbService
				.getStudentDetails(params.get('uid')!)
				.subscribe((studentRef) => {
					this.studentInfo = studentRef?.data();
				});
			console.log('this.studentInfo', this.studentInfo);
			console.dir(this.studentInfo);

			this.sub.add(studentSub);
		})

		this.sub.add(routeSub);
	}

	ngOnDestroy(): void {
		this.sub.unsubscribe();
	}

}
