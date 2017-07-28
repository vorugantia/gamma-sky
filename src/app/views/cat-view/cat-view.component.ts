import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cat-view',
  templateUrl: './cat-view.component.html'
})
export class CatViewComponent implements OnInit {

  private selectedView = "cat";

  constructor() {
  }

  ngOnInit() {
    console.log("CatViewComponent ngOnInit()");
  }

}
