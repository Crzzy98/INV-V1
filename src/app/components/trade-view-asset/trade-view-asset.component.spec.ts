import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeViewAssetComponent } from './trade-view-asset.component';

describe('TradeViewAssetComponent', () => {
  let component: TradeViewAssetComponent;
  let fixture: ComponentFixture<TradeViewAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeViewAssetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeViewAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
