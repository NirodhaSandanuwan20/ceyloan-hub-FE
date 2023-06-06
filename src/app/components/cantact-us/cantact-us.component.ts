import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../services/message.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cantact-us',
  templateUrl: './cantact-us.component.html',
  styleUrls: ['./cantact-us.component.css']
})
export class CantactUsComponent implements OnInit {
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('Hi', Validators.required),
  });


  constructor(private messageService: MessageService,
              private matSnack: MatSnackBar
              ) { }

  ngOnInit(): void {
  }

  submit(){
    let message = {
      name: this.contactForm.get('name').value!,
      email: this.contactForm.get('email').value!,
      message: this.contactForm.get('message').value!
    };
    this.messageService.submit(message).subscribe(resp => {
        console.log(resp);
        this.contactForm.reset();
        this.contactForm.clearValidators();
        this.matSnack.open('We will contact your ASAP', 'Success',{
          duration: 10,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
    },
      error => {
        this.matSnack.open('Try Agian ', 'Close',{
          duration: 10,
          verticalPosition: 'top',
          horizontalPosition: 'right'
        });
      });
  }


}
