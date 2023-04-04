import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CantactUsComponent } from './cantact-us.component';

describe('CantactUsComponent', () => {
  let component: CantactUsComponent;
  let fixture: ComponentFixture<CantactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CantactUsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CantactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
