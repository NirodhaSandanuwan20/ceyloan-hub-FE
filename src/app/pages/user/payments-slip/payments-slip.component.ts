import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileHandle} from "../../../model/FileHandle";
import {Question} from "../../../model/Question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../../services/question.service";
import {DomSanitizer} from "@angular/platform-browser";
import {UserPayments} from "../../../model/UserPayments";
import Swal from "sweetalert2";
import {LoginService} from "../../../services/login.service";
import {CategoryService} from "../../../services/category.service";

@Component({
  selector: 'app-payments-slip',
  templateUrl: './payments-slip.component.html',
  styleUrls: ['./payments-slip.component.css']
})
export class PaymentsSlipComponent implements OnInit {
  user;
  enableBtn = true;
  cid;
  category;
  @ViewChild('selectFile', { static: false }) selectFileInput: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private loginService: LoginService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.cid = this._route.snapshot.params.cid;
    this.getCategory();
    console.log(this.user);
  }


  userPayments: UserPayments = {
    categoryId: this._route.snapshot.params.cid,
    user: {
      id: JSON.parse(localStorage.getItem('user')).id,
    },
    slipImages: []
  };

  getCategory(){
    this.category = this.categoryService.GetCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category);
      },error => {
        console.log(error);
      }
    );
  }

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
      console.log("onflieselected");
      this.enableBtn = false;
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
    console.log("prepareformdata");
    return formData;
  }

  removeImage(i: number) {
    this.userPayments.slipImages.splice(i, 1);
    this.enableBtn = true;
    this.selectFileInput.nativeElement.value = '';

  }


  formSubmit() {
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
        this.selectFileInput.nativeElement.value = '';
        this.enableBtn = true;


      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in adding question', 'error');
      }
    );
  }
}
