import {Component, OnInit} from '@angular/core';
import {FileHandle} from "../../../model/FileHandle";
import {Question} from "../../../model/Question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../../services/question.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserPayments} from "../../../model/UserPayments";
import Swal from "sweetalert2";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-payments-slip',
  templateUrl: './payments-slip.component.html',
  styleUrls: ['./payments-slip.component.css']
})
export class PaymentsSlipComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
  }


  userPayments: UserPayments = {
    categoryId: this._route.snapshot.params.cid,
    user: {
      id: JSON.parse(localStorage.getItem('user')).id,
    },
    slipImages: []
  };

  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      };
      this.userPayments.slipImages.push(fileHandle);
    }
  }

  prepareFormData(userPayments: UserPayments): FormData {
    const formData = new FormData();
    formData.append(
      'userPayments',
      new Blob([JSON.stringify(userPayments)], {type: 'application/json'})
    );
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < userPayments.slipImages.length; i++) {
      formData.append(
        'imageFile',
        userPayments.slipImages[i].file,
        userPayments.slipImages[i].file.name
      );
    }
    return formData;
  }

  // tslint:disable-next-line:typedef
  removeImage(i: number) {
    this.userPayments.slipImages.splice(i, 1);
  }


  formSubmit() {
    console.log(this.userPayments);
    const paymentsFormData = this.prepareFormData(this.userPayments);
    this.questionService.addSlip(paymentsFormData).subscribe(
      (data: any) => {
        Swal.fire('Success ', 'Question Added. Add Another one', 'success');
        /* this.question.content = '';
        this.question.option1 = '';
        this.question.option2 = '';
        this.question.option3 = '';
        this.question.option4 = '';
        this.question.option5 = '';
        this.question.answer = ''; */
        this.userPayments.slipImages = [];
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
