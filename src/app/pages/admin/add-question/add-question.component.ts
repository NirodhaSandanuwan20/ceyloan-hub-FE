import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {DomSanitizer} from '@angular/platform-browser';
import {Question} from '../../../model/Question';
import {FileHandle} from "../../../model/FileHandle";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {
  public Editor = ClassicEditor;
  qId;
  qTitle;
  question: Question = {
    quiz: {},
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    answer: '',
    questionImages: []
  };

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params.qid;
    this.qTitle = this.route.snapshot.params.title;
    // tslint:disable-next-line:no-unused-expression
    this.question.quiz['qId'] = this.qId;
  }

  // tslint:disable-next-line:typedef
  formSubmit() {
    if (this.question.content.trim() === '' || this.question.content == null) {
      return;
    }

    if (this.question.option1.trim() === '' || this.question.option1 == null) {
      return;
    }
    if (this.question.option2.trim() === '' || this.question.option2 == null) {
      return;
    }
    if (this.question.answer.trim() === '' || this.question.answer == null) {
      return;
    }


    const questionFormData = this.prepareFormData(this.question);
    this.questionService.addQuestion(questionFormData).subscribe(
      (data: any) => {
        Swal.fire('Success ', 'Question Added. Add Another one', 'success');
        this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.option5 = '';
        this.question.answer = '';
        this.question.questionImages = [];
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
  }

  fileDropped(fileHandle: FileHandle) {
    this.question.questionImages.push(fileHandle);
  }
}
