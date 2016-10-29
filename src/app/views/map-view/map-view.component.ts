import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  private selectedView = "map";

  constructor() { }

  ngOnInit() {
    console.log("MapViewComponent ngOnInit()");
  }

}
