import { Injectable } from '@angular/core';
import baseUrl from "./helper";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private _http: HttpClient) { }

  addSlip(userPayments) {
    return this._http.post(`${baseUrl}/payments/`, userPayments);
  }

  getSlip(payments_id) {
    return this._http.get(`${baseUrl}/payments/`+payments_id,{});
  }


}
