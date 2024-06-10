import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FileHandle} from "../../../model/FileHandle";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {UserPayments} from "../../../model/UserPayments";
import Swal from "sweetalert2";
import {LoginService} from "../../../services/login.service";
import {CategoryService} from "../../../services/category.service";
import {PaymentsService} from "../../../services/payments.service";
import {SelectSubjectService} from "../../../services/select-subject.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-payments-slip',
  templateUrl: './payments-slip.component.html',
  styleUrls: ['./payments-slip.component.css']
})
export class PaymentsSlipComponent implements OnInit {
  user;
  userId = JSON.parse(localStorage.getItem('user')).id;
  email = JSON.parse(localStorage.getItem('user')).email;
  enableBtn = true;
  cid;
  category;
  date = 'ew';
  @ViewChild('selectFile', { static: false }) selectFileInput: ElementRef;
  private payments_id: any;

  constructor(
    private paymentsService: PaymentsService,
    private sanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private loginService: LoginService,
    private categoryService: CategoryService,
    private router: Router,
    private selectSubjectServeice: SelectSubjectService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService

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
      id: this.userId,
    },
    slipImages: []
  };

  getCategory(){
    this.category = this.categoryService.GetCategory(this.cid).subscribe(
      (data: any) => {
        this.category = data;
        console.log(this.category);
      }, error => {
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

    let msg = this.category.title + ' papers module will be added withing 15 minutes ';
    this.paymentsService.addSlip(paymentsFormData).subscribe(
      (data: any) => {
        console.log(data.paymentsId);
        Swal.fire('Success ',msg , 'success');
        this.userPayments.slipImages = [];
        this.selectFileInput.nativeElement.value = '';
        this.enableBtn = true;
        this.payments_id = data.paymentsId;
        this.addCategory();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error while proceeding, Try again', 'error');
      }
    );
  }

  addCategory() {
    let c = {
      cid: this.cid,
      date: this.date,
      cTitle: this.category.title,
      payments_id: this.payments_id,
      user: {
        id: this.userId,
      },
    };

    this.selectSubjectServeice.addUserCategory(c).subscribe((Response) => {
        console.log(this.userId);
        let msg = this.category.title + ' papers module will be added withing 15 minutes ';
        this.notificationService.notifyProductPurchase(this.userId, msg).subscribe();
      },
      (error) => {
        console.log(error);
        this.snackBar.open('Error Occurred', 'Oops !!', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      });
  }


}



