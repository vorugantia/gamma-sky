import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

declare let $: any;

@Component({
  selector: 'app-about-button',
  templateUrl: './about-button.component.html'
})
export class AboutButtonComponent implements OnInit {

  private aboutButtonRight;

  constructor(public dialog: MdDialog) {
  }

  ngOnInit() {
    this.resize();
  }

  onClick() {
    this.dialog.open(AboutDialogComponent);
  }

  // TODO make this a directive, or just use Angular event listeners. Don't use jQuery.
  resize() {
    let pageWidth = $(document).width();

    if (pageWidth > 800) {
      this.aboutButtonRight = '160px';
    } else {
      this.aboutButtonRight = '110px';
    }
  }

}


@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html'
})
export class AboutDialogComponent {
}
