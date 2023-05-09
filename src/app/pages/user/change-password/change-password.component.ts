import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../../model/passwordMatch";
import Swal from "sweetalert2";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user;
  mail;
  showPasswordFlag: boolean = true;
  changeType: boolean = true;

  constructor(
    private userService: UserService,
    private router: Router,
    private  loginService: LoginService
  ) { }

  changeForm = new FormGroup({
      otp: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirm: new FormControl('', [Validators.required])
    }
    , [passwordMatch('newPassword', 'confirm')]
  );

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.mail = this.user.email;
  }

  verifyAndSend() {
    console.log(this.changeForm.get('otp')?.value!);
    console.log(this.mail);
    this.userService.forgotPassowrd(this.changeForm.get('otp')?.value!, this.changeForm.get('newPassword')?.value!, this.mail).subscribe(response => {
      console.log(response);
      Swal.fire('Your password changed success .', 'Done', 'success');
      this.router.navigateByUrl('/profile');
    }, error => {
      Swal.fire('OTP is not matching !! ', '', 'error');
    });
  }

  resendMail() {
    this.userService.resendMail(this.mail).subscribe(resp => {
      Swal.fire('Email sent', 'Check out your mail & and spam folder ', 'success');
    }, error => {
      Swal.fire('Try again', '', 'error');
    });
  }

  showPassword() {
    this.showPasswordFlag = !this.showPasswordFlag;
    this.changeType = !this.changeType;
  }

}
