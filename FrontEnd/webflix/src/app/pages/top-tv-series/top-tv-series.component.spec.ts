import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTvSeriesComponent } from './top-tv-series.component';

describe('TopTvSeriesComponent', () => {
  let component: TopTvSeriesComponent;
  let fixture: ComponentFixture<TopTvSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopTvSeriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopTvSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
