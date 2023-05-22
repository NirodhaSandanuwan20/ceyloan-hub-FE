import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../model/passwordMatch";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService,
              private snack: MatSnackBar,
              private router: Router,
              private _formBuilder: FormBuilder
  ) {
  }


  personalForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    Username: new FormControl('', [Validators.required, Validators.min(4)]),
  });

  verifyForm = new FormGroup({
    code: new FormControl('', [Validators.required])
  });

  usernameForm = new FormGroup({
    Username: new FormControl('', [Validators.required, Validators.min(4)])
  });

  passwordForm = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.min(4)]),
      confirm: new FormControl('', [Validators.required, Validators.min(4)])
    },
    [passwordMatch('password', 'confirm')]
  );

  show: boolean = true;
  changeType: boolean = true;
  email;

  ngOnInit(): void {
  }

  formSubmit() {
this.email = this.personalForm.get('email')?.value!;
    let user = {
      email: this.personalForm.get('email')?.value!,
      username: this.personalForm.get('Username')?.value!
    };

    //addUser: userservice
    this.userService.addUser(user).subscribe(
      (data: any) => {
        console.log(data);
        this.snack.open('Email Send Success', 'success', {
          duration: 3000,
        });
      },
      (error) => {
        //error
        console.log(error);
        // alert('something went wrong');
        this.snack.open(error.error.text, 'error', {
          duration: 3000,
        });
      }
    );
  }

  showPassword() {
    this.show = !this.show;
    this.changeType = !this.changeType
  }

  verify() {

    this.userService.verify(
      this.verifyForm.get('code')?.value!,
      this.email
    ).subscribe(response => {
      console.log(response);
      this.snack.open('Verify Success', 'success', {
        duration: 3000,
      });
    }, error => {
      this.snack.open('Invalid Otp', 'error', {
        duration: 3000,
      });
    });
  }

  resendMail() {
    this.userService.resendMail(this.email).subscribe(resp => {
      Swal.fire('Email Sent', 'Check out your mail & And spam Folder ', 'success');
    }, error => {
      Swal.fire('Try again', '', 'error');
    });
  }


  createPassword() {
    console.log(this.email);
    this.userService.forgotPassowrd(this.verifyForm.get('code')?.value!, this.passwordForm.get('confirm')?.value!, this.email).subscribe(response => {
      console.log(response);
      Swal.fire('Your password changed success .', 'Done', 'success');

    }, error => {
      Swal.fire('OTP is not matching !! ', '', 'error');
    });
  }

}
