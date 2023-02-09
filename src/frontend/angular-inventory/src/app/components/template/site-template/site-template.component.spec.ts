import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTemplateComponent } from './site-template.component';

describe('BaseTemplateComponent', () => {
  let component: SiteTemplateComponent;
  let fixture: ComponentFixture<SiteTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
