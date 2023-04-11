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

  forgotPassword() {
    console.log(this.mailForm.get('email')?.value!);
    this.userService.forgotPassowrd(this.mailForm.get('email')?.value!).subscribe(response => {
      console.log(response);
      Swal.fire('Loging credential sent to your email.Check your inbox and spam box as well.', 'Successfull', 'success');
      this.router.navigateByUrl('/login');
    }, error => {
      Swal.fire('Recheck your mail and try again !! ', 'Error', 'error');
    });
  }

  /*changePassword(){
    console.log(this.changeForm.get('otp')?.value!);
    console.log(this.changeForm.get('newPassword')?.value!);
    console.log(this.email);
    this.userService.changePassword(this.changeForm.get('otp')?.value!,this.email,this.changeForm.get('newPassword')?.value!).subscribe(response => {
      console.log(response);
      Swal.fire('Password Change Successfully', 'Done', 'success');

    }, error => {
      Swal.fire('Oops!! try again !! ', '', 'error');
    });
  }*/

}
