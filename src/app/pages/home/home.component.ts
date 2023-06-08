import {Component, OnInit, Renderer2} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myInterval = 1000;
  activeSlideIndex = 0;
  slides: {image: string; text?: string}[] = [
    {image: 'assets/money.jpg'},
    {image: 'assets/card-2.jpg'},
    {image: 'assets/exam1.png'},
    {image: 'assets/timewasting.jpg'},
    {image: 'assets/welcome.jpg'}
  ];

  constructor() { }

  ngOnInit() {}
}
