import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrelloBoardListComponent } from './trello-board-list.component';

describe('TrelloBoardListComponent', () => {
  let component: TrelloBoardListComponent;
  let fixture: ComponentFixture<TrelloBoardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrelloBoardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrelloBoardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
