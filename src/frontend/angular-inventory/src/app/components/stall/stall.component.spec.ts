import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StallComponent } from './stall.component';

describe('StallComponent', () => {
  let component: StallComponent;
  let fixture: ComponentFixture<StallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
