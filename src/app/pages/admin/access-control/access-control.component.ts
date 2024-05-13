import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../services/category.service';
import {SelectSubjectService} from '../../../services/select-subject.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})
export class AccessControlComponent implements OnInit {
  searchText: any;
  selectedCategories;
  ELEMENT_DATA;
  displayedColumns: string[] = ['Username', 'Module', 'Status', 'Pay Slip'];
  dataSource;

  color: ThemePalette = 'accent';

  value = '';
  isActivated = true;

  constructor(
    private selectSubjectServeice: SelectSubjectService,
  ) { }

  ngOnInit(): void {
    this.searchNow();
  }

  searchNow() {
    this.getAllCategories();
  }

  clear() {
    this.searchText = '';
    this.getAllCategories();
  }

  getAllCategories() {
    console.log(this.isActivated);
    this.selectSubjectServeice.getAllUserCategory('', this.isActivated, this.value).subscribe(response => {
        console.log(response);
        this.selectedCategories = response;
        this.ELEMENT_DATA = response;
        this.dataSource = this.ELEMENT_DATA;

      },
      (error) => {
        // error
        console.log(error);

      }
    );
  }


}
