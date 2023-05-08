import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../model/passwordMatch";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userService: UserService,
              private snack: MatSnackBar,
              private router: Router) {}


  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    Username: new FormControl('', [Validators.required,Validators.min(4)]),
    password: new FormControl('', [Validators.required,Validators.min(4)]),
      confirm: new FormControl('', [Validators.required,Validators.min(4)])
  },
    [ passwordMatch('password', 'confirm') ]
  );

  show:boolean = true;
  changeType:boolean = true;

  ngOnInit(): void {}

  formSubmit() {

    let user = {
      email: this.signupForm.get('email')?.value!,
      username: this.signupForm.get('Username')?.value!,
      password: this.signupForm.get('password')?.value!
    };

    //addUser: userservice
    this.userService.addUser(user).subscribe(
      (data: any) => {
       console.log(data);
        //alert('success');
        Swal.fire('Now Verify Your Email !!', '', 'info');
        this.router.navigateByUrl('verify/'+user.email).then()
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

  showPassword(){
    this.show=!this.show;
    this.changeType=!this.changeType
  }
}
