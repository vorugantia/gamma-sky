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

  private shareButtonRight;
  private urlString;

  onClick() {
    this.dialog.open(ShareDialogComponent);
  }

  resize() {
    let pageWidth = $(document).width();

    if(pageWidth > 800) {
      this.shareButtonRight = "100px";
    }
    else {
      this.shareButtonRight = "50px";
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

  // See https://stackoverflow.com/a/40733052/4726636
  private urlString = this.document.location.href;

  constructor(@Inject(DOCUMENT) private document: any) {}

}
