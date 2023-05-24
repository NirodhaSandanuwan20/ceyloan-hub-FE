import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    const isMobile = this.detectMobile();

    if (isMobile) {
      this.renderer.addClass(document.body, 'portrait-mode');
    } else {
      this.renderer.removeClass(document.body, 'portrait-mode');
    }
  }

  detectMobile(): boolean {
    return window.innerWidth < 376; // Adjust the threshold according to your requirements
  }
}
