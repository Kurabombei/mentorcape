import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMentorAccomplishementsComponent } from './dashboard-mentor-accomplishements.component';

describe('DashboardMentorAccomplishementsComponent', () => {
  let component: DashboardMentorAccomplishementsComponent;
  let fixture: ComponentFixture<DashboardMentorAccomplishementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardMentorAccomplishementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMentorAccomplishementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
