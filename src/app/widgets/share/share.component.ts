import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MdDialog } from '@angular/material';

declare var $: any;

@Component({
  selector: 'share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareButtonComponent implements OnInit {

// Button to the left of "About". On click, a text field appears in the middle of the window. Share URL is inside. Also share URL is updated in website URL. The div for the field takes up the whole page, you can't click anything else. Then there's a "close" button below (make sure border + close button background are contrasting colors.) WIDTH 400px for field.

  private shareButtonRight;
  private urlString;

  openLink() {
    this.dialog.open(ShareDialogComponent);
  }

  resize() {

    let pageWidth = $(document).width();

    if(pageWidth > 800) {
      this.shareButtonRight = "160px";
    }
    else {
      this.shareButtonRight = "110px";
    }

  }

  constructor(public dialog: MdDialog) {}

  ngOnInit() {
    this.resize();
  }

}

@Component({
  selector: 'share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareDialogComponent {

  // Using https://stackoverflow.com/a/40733052/4726636
  private urlString = this.document.location.href;

  constructor(@Inject(DOCUMENT) private document: any) {}

}
