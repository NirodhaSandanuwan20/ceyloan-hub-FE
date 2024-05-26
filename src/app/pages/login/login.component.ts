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
    // Request to server to generate token
    this.login.generateToken(loginData).subscribe(
      (data: any) => {
        console.log('success');
        console.log(data);

        // Login...
        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe((user: any) => {
          this.login.setUser(user);
          console.log(user);
          // Redirect ...ADMIN: admin-dashboard
          // Redirect ...NORMAL: normal-dashboard
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
      (errorResp) => {
        console.log(errorResp);

        // Determine the type of error and display appropriate message
        let errorMessage = 'An error occurred. Please try again.';
        if (errorResp.status === 401) {
          errorMessage = errorResp.error;
        } else if (errorResp.status === 404) {
          errorMessage = errorResp.error;
        } else if (errorResp.status === 500) {
          errorMessage = 'Internal Server Error! Please try again later.';
        }

        this.snack.open(errorMessage, '', {
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
