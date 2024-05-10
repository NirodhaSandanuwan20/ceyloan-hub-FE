import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSlipComponent } from './payments-slip.component';

describe('PaymentsSlipComponent', () => {
  let component: PaymentsSlipComponent;
  let fixture: ComponentFixture<PaymentsSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsSlipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
