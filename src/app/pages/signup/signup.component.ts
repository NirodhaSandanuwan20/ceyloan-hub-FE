import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordMatch} from "../../model/passwordMatch";
import {MatStepper, MatVerticalStepper} from "@angular/material/stepper";

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

  isResendVisible: boolean = false;
  isResendDisabled: boolean = true;
  countdown: number;
  timerInterval: any;


  personalForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
  });

  verifyForm = new FormGroup({
    code: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)])
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

  @ViewChild(MatStepper) stepper!: MatStepper;
  editable: boolean = true;

  ngOnInit(): void {
  }

  moveToStep(stepNumber: number) {
    this.stepper.selectedIndex = stepNumber;
  }

  SignUpWithMail(stepper: MatVerticalStepper) {
    console.log(stepper);

    this.email = this.personalForm.get('email')?.value!;
    let user = {
      email: this.personalForm.get('email')?.value!,
      firstName: this.personalForm.get('firstName')?.value!,
    };

    //addUser: userservice
    this.userService.addUser(user).subscribe((data: any) => {
        if (data) {
          this.snack.open('Email Send Success', 'success', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });

          this.startResendTimer();

        } else {
          this.snack.open('Email already registered', 'erorr', {
            duration: 3000,
            horizontalPosition: "right",
            verticalPosition: "top"
          });
          this.moveToStep(0);
        }
      },
      (error) => {
        //error
        console.log(error);
        this.snack.open(error.error.text, 'error', {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top"
        });
        this.moveToStep(0);
      }
    );
  }

  showPassword() {
    this.show = !this.show;
    this.changeType = !this.changeType
  }

  verifyOtp() {
    this.userService.verify(
      this.verifyForm.get('code')?.value!,
      this.email
    ).subscribe(response => {
      this.snack.open('Verify Success', 'success', {
        duration: 3000,
        panelClass: 'green'
      });
      this.editable = false;

    }, error => {
      console.log(error);
      let errorMessage = 'An error occurred. Please try again.';
      if (error.status === 400) {
        errorMessage = 'Invalid OTP Please check your OTP';
      }
      this.snack.open(errorMessage, '', {
        duration: 3000,
      });
      this.editable = true;
      this.stepper.selectedIndex = this.stepper.selectedIndex;
      this.moveToStep(1);
      this.verifyForm.reset();
    });
  }

  resendMail() {
    this.userService.resendMail(this.email).subscribe(resp => {
      Swal.fire('Email Sent', 'Check out your mail & And spam Folder ', 'success');
      this.startResendTimer();
    }, error => {
      Swal.fire('Try again', '', 'error');
    });
  }


  EnableUser() {
    console.log(this.email);
    this.userService.forgotPassowrd(this.verifyForm.get('code')?.value!, this.passwordForm.get('confirm')?.value!, this.email).subscribe(response => {
      console.log(response);
      this.snack.open('Account Create Success', 'succeeded', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: 'green'
      });

    }, error => {
      Swal.fire('Try Again later !! ', 'error', 'error');
    });
  }


  startResendTimer() {
    this.isResendVisible = true;
    this.isResendDisabled = true;
    this.countdown = 20; // 2 minutes

    this.timerInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.timerInterval);
        this.isResendDisabled = false;
      }
    }, 1000);
  }

  getFormattedTime(): string {
    const minutes: number = Math.floor(this.countdown / 60);
    const seconds: number = this.countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  lockStep(stepIndex: number) {
    const step = this.stepper.steps.toArray()[stepIndex];
    step.editable = false;
    step.completed = true;
  }

  // Method to unlock a specific step
  unlockStep(stepIndex: number) {
    const step = this.stepper.steps.toArray()[stepIndex];
    step.editable = true;
    step.completed = false;
  }


}
