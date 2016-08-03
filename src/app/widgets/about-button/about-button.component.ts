import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'about-button',
  templateUrl: 'about-button.component.html',
  styleUrls: ['about-button.component.css']
})
export class AboutButtonComponent implements OnInit {

  private toggle: boolean;
  private aboutButtonRight;
  private aboutInfoRight;
  private aboutInfoWidth;

  onClick() {
    $("#aboutInfo").toggle();

    this.toggle = !this.toggle
    this.changeButtonDisplay();
  }

  changeButtonDisplay() {
    if(this.toggle == false) {
      return "About";
    }
    else {
      return "Close";
    }
  }

  resize() {

    var pageWidth = $(document).width();

    if (pageWidth > 800) {
      this.aboutButtonRight = "100px";
      this.aboutInfoRight = "100px";
    }
    if (pageWidth <= 800) {
      this.aboutButtonRight = "50px";
      this.aboutInfoRight = "50px";

    }
    if (pageWidth > 500) {
      this.aboutInfoWidth = "410px";
    }
    if (pageWidth <= 500) {
      this.aboutInfoWidth = "205px";
    }

  }

  constructor() { }

  ngOnInit() {
    this.toggle = false;
    this.changeButtonDisplay();
    this.resize();
  }

}
