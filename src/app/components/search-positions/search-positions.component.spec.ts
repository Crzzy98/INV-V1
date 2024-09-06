import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPositionsComponent } from './search-positions.component';

describe('SearchPositionsComponent', () => {
  let component: SearchPositionsComponent;
  let fixture: ComponentFixture<SearchPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchPositionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
