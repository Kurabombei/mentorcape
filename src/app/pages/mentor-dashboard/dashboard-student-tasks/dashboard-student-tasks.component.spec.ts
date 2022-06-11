import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardStudentTasksComponent } from './dashboard-student-tasks.component';

describe('DashboardStudentTasksComponent', () => {
  let component: DashboardStudentTasksComponent;
  let fixture: ComponentFixture<DashboardStudentTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardStudentTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardStudentTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
