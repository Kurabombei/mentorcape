import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroBlockComponent } from './hero-block.component';

describe('HeroBlockComponent', () => {
  let component: HeroBlockComponent;
  let fixture: ComponentFixture<HeroBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
