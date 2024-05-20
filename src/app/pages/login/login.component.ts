import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

import {LoginService} from 'src/app/services/login.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  show: boolean = true;
  changeType: boolean = true;

  constructor(
    private snack: MatSnackBar,
    private login: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }

  formSubmit() {
    console.log('login btn clicked');

    let loginData = {
      email: this.loginForm.get('email').value!,
      password: this.loginForm.get('password').value!
    };
    //request to server to generate token
    this.login.generateToken(loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        //login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          //redirect ...ADMIN: admin-dashboard
          //redirect ...NORMAL:normal-dashboard
          if (this.login.getUserRole() == 'ADMIN') {

            this.router.navigate(['admin']);
            this.login.loginStatusSubject.next(true);
          } else if (this.login.getUserRole() == 'NORMAL') {
            const returnUrl = this.route.snapshot.queryParams.returnUrl || '/user-dashboard';
            // Redirect the user back to the previous page or a default page (e.g., home) after successful login
            this.router.navigateByUrl(returnUrl);
            this.login.loginStatusSubject.next(true);
          } else {
            this.login.logout();
          }
        });
      },
      (error) => {
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid Details !! Try again', '', {
          duration: 3000,
        });
      }
    );
  }

  showPassword() {
    this.show = !this.show;
    this.changeType = !this.changeType;
  }
}
