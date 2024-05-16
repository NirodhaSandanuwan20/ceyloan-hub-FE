import {Component, OnInit} from '@angular/core';
import {SelectSubjectService} from '../../../services/select-subject.service';
import {ThemePalette} from '@angular/material/core';
import {PaymentsService} from "../../../services/payments.service";
import {map} from "rxjs/operators";
import {ImageProcessingService} from '../../../services/ImageProcessingService';
import {Slip} from "../../../model/Slip";

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
  paymentSlip;
  clickSlip = false;

  constructor(
    private selectSubjectServeice: SelectSubjectService,
    private paymentsService: PaymentsService,
    private imageProcessingService: ImageProcessingService,
    ) {
  }

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


/*  getSlip(element) {
    console.log(element.payments_id);
    this.paymentsService.getSlip(element.payments_id)
      .pipe(
        map((x: Slip[], i) => x.map((slip: Slip) => this.imageProcessingService.creatSlip(slip)))
      )
      .subscribe(
        (data: Slip[]) => {
        console.log(data);
        this.paymentSlip = data;
        console.log(this.paymentSlip);
        console.log(this.paymentSlip.slipImages[0]);
        this.clickSlip = true;
      },
      (error) => {
        console.log(error);

      }
    );
  }*/

  getSlip(element) {
    console.log(element.payments_id);
    this.paymentsService.getSlip(element.payments_id)
      .subscribe(resp => {
        this.paymentSlip = resp;
        console.log(this.paymentSlip);
        console.log(this.paymentSlip.slipImages[0]);
        this.clickSlip = true;
      },
      (error) => {
        console.log(error);

      }
    );
  }
}
