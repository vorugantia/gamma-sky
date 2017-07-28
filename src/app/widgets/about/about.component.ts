import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

declare var $: any;

@Component({
  selector: 'about-button',
  templateUrl: './about-button.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutButtonComponent implements OnInit {

  private aboutButtonRight;

  onClick() {
    this.dialog.open(AboutDialogComponent);
  }

  // TODO make this a directive, or just use Angular event listeners. Don't use jQuery.
  resize() {
    let pageWidth = $(document).width();

    if (pageWidth > 800) {
      this.aboutButtonRight = "160px";
    }
    else {
      this.aboutButtonRight = "110px";
    }
  }

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
    this.resize();
  }

}


@Component({
  selector: 'about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutDialogComponent {
}
