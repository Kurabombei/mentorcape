import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MentorshipReviewsComponent } from './mentorship-reviews.component';

describe('MentorshipReviewsComponent', () => {
  let component: MentorshipReviewsComponent;
  let fixture: ComponentFixture<MentorshipReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MentorshipReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MentorshipReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
