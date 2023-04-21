import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAttemptHistoryComponent } from './quiz-attempt-history.component';

describe('QuizAttemptHistoryComponent', () => {
  let component: QuizAttemptHistoryComponent;
  let fixture: ComponentFixture<QuizAttemptHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizAttemptHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAttemptHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
