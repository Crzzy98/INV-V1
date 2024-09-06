import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPositionsComponent } from './check-positions.component';

describe('CheckPositionsComponent', () => {
  let component: CheckPositionsComponent;
  let fixture: ComponentFixture<CheckPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPositionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
