import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'map-view',
  templateUrl: 'map-view.component.html',
  styleUrls: ['map-view.component.css']
})
export class MapViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('MapViewComponent ngOnInit()');
  }

}
