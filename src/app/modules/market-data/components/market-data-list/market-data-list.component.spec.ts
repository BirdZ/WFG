import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDataListComponent } from './market-data-list.component';

describe('MarketDataListComponent', () => {
  let component: MarketDataListComponent;
  let fixture: ComponentFixture<MarketDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
