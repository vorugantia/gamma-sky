import { Component, Inject, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

declare var $: any;

@Component({
  selector: 'button-share',
  templateUrl: './button-share.component.html',
  styleUrls: ['./button-share.component.css']
})
export class ButtonShareComponent implements OnInit {

// Button to the left of "About". On click, a text field appears in the middle of the window. Share URL is inside. Also share URL is updated in website URL. The div for the field takes up the whole page, you can't click anything else. Then there's a "close" button below (make sure border + close button background are contrasting colors.) WIDTH 400px for field.

  private shareButtonRight;
  private urlString;
  private toggle;

  // Using https://stackoverflow.com/a/40733052/4726636
  openLink() {
    this.urlString = this.document.location.href;
    this.toggle = true;
  }

  closeLink() {
    this.toggle = false;
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

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.resize();
    this.toggle = false;
  }

}
