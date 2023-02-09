import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExpiredComponent } from './product-expired.component';

describe('StockExpiredComponent', () => {
  let component: ProductExpiredComponent;
  let fixture: ComponentFixture<ProductExpiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductExpiredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductExpiredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
