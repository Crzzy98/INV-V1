import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteModalComponent } from './site-modal.component';

describe('SiteModalComponent', () => {
  let component: SiteModalComponent;
  let fixture: ComponentFixture<SiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
