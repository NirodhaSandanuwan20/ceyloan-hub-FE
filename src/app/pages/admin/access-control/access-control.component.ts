import {Component, OnInit} from '@angular/core';
import {SelectSubjectService} from '../../../services/select-subject.service';
import {ThemePalette} from '@angular/material/core';
import {PaymentsService} from "../../../services/payments.service";
import {map} from "rxjs/operators";
import {ImageProcessingService} from '../../../services/ImageProcessingService';
import {Slip} from "../../../model/Slip";
import {SafeUrl} from "@angular/platform-browser";

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
  pic;
  url;
  public imageUrl: SafeUrl | null = null;

  constructor(
    private selectSubjectService: SelectSubjectService,
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
    this.selectSubjectService.getAllUserCategory('', this.isActivated, this.value).subscribe(response => {
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


  getSlip(element) {
    console.log(element.payments_id);
    this.paymentsService.getSlip(element.payments_id)
      .subscribe(resp => {
          this.paymentSlip = resp;
          console.log(this.paymentSlip);
          this.pic = this.paymentSlip.slipImages[0].picByte;
          this.clickSlip = true;
          this.convertImage();
        },
        (error) => {
          console.log(error);

        }
      );
  }

  public async convertImage() {
    const picByte = this.pic;
    const fileName = 'convertedImage';

    try {
      this.imageUrl = await this.imageProcessingService.convertPicByteToPng(picByte, fileName);
    } catch (error) {
      console.error('Error converting image:', error);
    }
  }

  applyPaymentSetting(element) {
    console.log(element.userCategoryId);
    this.selectSubjectService.paymentStatus(element.userCategoryId).subscribe(resp => {
        console.log(resp);
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
