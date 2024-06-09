import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {SelectSubjectService} from "../../../services/select-subject.service";

@Component({
  selector: 'app-my-modules',
  templateUrl: './my-modules.component.html',
  styleUrls: ['./my-modules.component.css']
})
export class MyModulesComponent implements OnInit {
  userId;
  ELEMENT_DATA;
  isEmpty;
  dataSource;


  constructor(private loginService: LoginService,
              private selectSubjectServeice: SelectSubjectService,
  ) {
  }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.getSelectedCategory();
  }

  getSelectedCategory() {
    console.log(this.userId);

    this.selectSubjectServeice.getSelectedUserCategory(this.userId).subscribe(response => {
        console.log(response);
        this.ELEMENT_DATA = response;
        this.dataSource = this.ELEMENT_DATA;
        if (this.ELEMENT_DATA.length === 0) {
          this.isEmpty = true;
          console.log('empty');
        } else {
          this.isEmpty = false;
        }
      },
      (error) => {
        //error
        console.log(error);

      }
    );
  }



}
