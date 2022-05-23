import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BriefUserCardComponent } from './brief-user-card.component';

describe('BriefUserCardComponent', () => {
  let component: BriefUserCardComponent;
  let fixture: ComponentFixture<BriefUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BriefUserCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
