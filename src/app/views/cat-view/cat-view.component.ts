import { Component, OnInit } from '@angular/core';

import { StateService } from '../../services/state.service';

@Component({
  selector: 'cat-view',
  templateUrl: './cat-view.component.html',
  styleUrls: ['./cat-view.component.css']
})
export class CatViewComponent implements OnInit {

  private selectedView = "cat";

  constructor(public stateService: StateService) { }

  ngOnInit() {
    console.log("CatViewComponent ngOnInit()");
  }

}
