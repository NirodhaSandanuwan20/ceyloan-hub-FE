import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  user = null;
  constructor(private loginService: LoginService,
    private profileService: ProfileService
    ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    // this.login.getCurrentUser().subscribe(
    //   (user: any) => {
    //     this.user = user;
    //   },
    //   (error) => {
    //     alert('error');
    //   }
    // );
   
  }

  check() {
    console.log();
    this.profileService.getUserHistory(JSON.parse(localStorage.getItem('user')).id).subscribe(response=>{
      console.log(response);
      
    },erorr=>{
      console.log(erorr);
    });
    
    }
  
}
