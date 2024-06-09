import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbar: boolean = true;
  private isLoggedIn: boolean = true;
  constructor() { }


  getShowNavbar(): boolean {
    return this.showNavbar;
  }

  setShowNavbar(value: boolean): void {
    this.showNavbar = value;
  }


  getLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
  }

}
