import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomePageRoutingModule} from './home-page-routing.module';
import {HeroBlockComponent} from './hero-block/hero-block.component';
import {FindMentorComponent} from './find-mentor/find-mentor.component';
import {OurMentorsComponent} from './our-mentors/our-mentors.component';
import {MentorshipReviewsComponent} from './mentorship-reviews/mentorship-reviews.component';


@NgModule({
	declarations: [
		HeroBlockComponent,
		FindMentorComponent,
		OurMentorsComponent,
		MentorshipReviewsComponent
	],
	exports: [
		HeroBlockComponent,
		FindMentorComponent,
		OurMentorsComponent,
		MentorshipReviewsComponent
	],
	imports: [
		CommonModule,
		HomePageRoutingModule
	]
})
export class HomePageModule {
}
