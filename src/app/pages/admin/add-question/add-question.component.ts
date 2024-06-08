import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {QuestionService} from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import {DomSanitizer} from '@angular/platform-browser';
import {Question} from '../../../model/Question';
import {FileHandle} from '../../../model/FileHandle';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})

export class AddQuestionComponent implements OnInit {

  QuestionsForm = new FormGroup({
    image: new FormControl('', Validators.required),
    option1: new FormControl('', Validators.required),
    option2: new FormControl('', Validators.required),
    option3: new FormControl('', Validators.required),
    option4: new FormControl('', Validators.required),
    option5: new FormControl('', Validators.required),
    answer: new FormControl('', Validators.required),
  });


  @ViewChild('selectFile', {static: false}) selectFileInput: ElementRef;



  qId;
  qTitle;
  qCategory;
  question: Question = {
    quiz: {},
    content: '',
    option1: 'පිළිතුර 1',
    option2: 'පිළිතුර 2',
    option3: 'පිළිතුර 3',
    option4: 'පිළිතුර 4',
    option5: 'පිළිතුර 5',
    answer: '',
    questionImages: []
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private mat: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.qid;
    console.log(this.qCategory);
    this.question.quiz['qId'] = this.qId;
    this._route.params.subscribe((params) => {
      this.qId = params.qid;
      this.qTitle = params.title;
      this.qCategory = params.category;
      this.QuestionsForm.patchValue({
        option1: 'පිළිතුර 1',
        option2: 'පිළිතුර 2',
        option3: 'පිළිතුර 3',
        option4: 'පිළිතුර 4',
        option5: 'පිළිතුර 5'
      });
    });

  }

  // tslint:disable-next-line:typedef
  formSubmit() {

    const questionFormData = this.prepareFormData(this.question);
    this.questionService.addQuestion(questionFormData).subscribe(
      (data: any) => {
        this.mat.open('Question Added', 'Success', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        /* this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.option5 = '';
        this.question.answer = ''; */
        this.question.questionImages = [];
        this.selectFileInput.nativeElement.value = '';
      },
      (error) => {
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }

  // tslint:disable-next-line:typedef
  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };
      this.question.questionImages.push(fileHandle);
    }
  }

  prepareFormData(question: Question): FormData {
    const formData = new FormData();
    formData.append(
      'question',
      new Blob([JSON.stringify(question)], {type: 'application/json'})
    );
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < question.questionImages.length; i++) {
      formData.append(
        'imageFile',
        question.questionImages[i].file,
        question.questionImages[i].file.name
      );
    }
    return formData;
  }

  // tslint:disable-next-line:typedef
  removeImage(i: number) {
    this.question.questionImages.splice(i, 1);
    this.selectFileInput.nativeElement.value = '';
  }


}
