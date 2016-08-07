import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SwitchViewComponent } from '../switch-view/switch-view.component';
import { CatSearchComponent } from '../../widgets/cat-search/cat-search.component';

import { StateService } from '../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-view',
  templateUrl: 'cat-view.component.html',
  styleUrls: ['cat-view.component.css'],
  directives: [ROUTER_DIRECTIVES, SwitchViewComponent, CatSearchComponent],
  providers: [StateService]
})
export class CatViewComponent implements OnInit {

  private selectedView;

  constructor(public stateService: StateService) { }

  ngOnInit() {
    console.log('CatViewComponent ngOnInit()');
    this.selectedView = "cat";
  }

}
