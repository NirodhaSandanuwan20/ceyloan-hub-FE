import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
show = true;
mail;
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }




  mailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });


  changeForm = new FormGroup({
    otp: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required])
  });

  sendOtp() {
    this.mail = this.mailForm.get('email')?.value!;
    console.log(this.mailForm.get('email')?.value!);
    this.userService.resendMail(this.mailForm.get('email')?.value!).subscribe(response => {
      console.log(response);
      Swal.fire('OTP send Successfully. Check your inbox and spam box as well.', '', 'success');
      this.show = false;

    }, error => {
      Swal.fire('Recheck your mail and try again !! ', 'Error', 'error');
    });
  }

  verifyAndSend(){
    console.log(this.changeForm.get('otp')?.value!);
    console.log(this.mail);
    this.userService.forgotPassowrd(this.changeForm.get('otp')?.value!, this.mail).subscribe(response => {
      console.log(response);
      Swal.fire('Loging credential sent to your email.Check your inbox and spam box as well.', 'Done', 'success');
      this.router.navigateByUrl('/login');
    }, error => {
      Swal.fire('OTP is not matching !! ', '', 'error');
    });
  }


  resendMail() {
    this.userService.resendMail(this.mail).subscribe(resp=>{
      Swal.fire('Email sent', 'Check out your mail & and spam folder ', 'success');
    },error => {
      Swal.fire('Try again', '', 'error');
    });
  }

}
