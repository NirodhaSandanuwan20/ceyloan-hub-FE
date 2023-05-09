import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../../model/passwordMatch";
import Swal from "sweetalert2";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {
  user;
  oldMail;
  show = true;
  mail;
  showPasswordFlag: boolean = true;
  changeType: boolean = true;
  constructor(
    private userService: UserService,
    private router: Router,
    private loginService: LoginService
  ) { }

  mailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  changeForm = new FormGroup({
      otp: new FormControl('', [Validators.required])
    });

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.oldMail = this.user.email;
  }


  sendOtpToNewMail() {
    this.mail = this.mailForm.get('email')?.value!;
    console.log(this.mail);
    console.log(this.oldMail);
    this.userService.changeEmailRequest(this.oldMail, this.mail).subscribe(response => {
      console.log(response);
      Swal.fire('OTP send Successfully. Check your inbox and spam box as well.', '', 'success');
      this.show = false;

    }, error => {
      Swal.fire('Recheck your mail and try again !! ', 'Error', 'error');
    });
  }

  verifyNewMail() {
    console.log(this.changeForm.get('otp')?.value!);
    console.log(this.mail);
    this.userService.verifyNewMail(this.changeForm.get('otp')?.value!, this.mail, this.oldMail).subscribe(response => {
      console.log(response);
      Swal.fire('Your Email changed success .', 'Done', 'success');
      this.router.navigateByUrl('/profile');
    }, error => {
      Swal.fire('OTP is not matching !! ', '', 'error');
    });
  }


  resendMail() {
    this.userService.changeEmailRequest(this.oldMail, this.mail).subscribe(response => {
      console.log(response);
      Swal.fire('OTP send Successfully. Check your inbox and spam box as well.', '', 'success');
      this.show = false;

    }, error => {
      Swal.fire('Recheck your mail and try again !! ', 'Error', 'error');
    });
  }

  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag;
    this.changeType = !this.changeType;
  }

}
