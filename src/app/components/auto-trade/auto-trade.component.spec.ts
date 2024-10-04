import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoTradeComponent } from './auto-trade.component';

describe('AutoTradeComponent', () => {
  let component: AutoTradeComponent;
  let fixture: ComponentFixture<AutoTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoTradeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
