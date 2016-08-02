import { Component, OnInit } from '@angular/core';
import { SwitchViewComponent } from '../switch-view/switch-view.component';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'map-view',
  templateUrl: 'map-view.component.html',
  styleUrls: ['map-view.component.css'],
  directives: [SwitchViewComponent]
})
export class MapViewComponent implements OnInit {

  private notCurrentView;

  constructor() { }

  ngOnInit() {
    console.log('MapViewComponent ngOnInit()');
    this.notCurrentView = "cat";
  }

}
