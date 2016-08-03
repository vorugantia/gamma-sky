import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { SwitchViewComponent } from '../switch-view/switch-view.component';
import { CatSearchComponent } from '../../widgets/cat-search/cat-search.component';

@Component({
  moduleId: module.id,
  selector: 'cat-view',
  templateUrl: 'cat-view.component.html',
  styleUrls: ['cat-view.component.css'],
  directives: [ROUTER_DIRECTIVES, SwitchViewComponent, CatSearchComponent]
})
export class CatViewComponent implements OnInit {

  private selectedView;

  constructor() { }

  ngOnInit() {
    console.log('CatViewComponent ngOnInit()');
    this.selectedView = "cat";
  }

}
