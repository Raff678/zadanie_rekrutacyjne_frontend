import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuelingHistoryComponent } from './refueling-history.component';

describe('RefuelingHistoryComponent', () => {
  let component: RefuelingHistoryComponent;
  let fixture: ComponentFixture<RefuelingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuelingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuelingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
