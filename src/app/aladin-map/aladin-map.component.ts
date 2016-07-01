import { Component, OnInit } from '@angular/core';
// declare var $:any;
declare var A:any;

@Component({
  moduleId: module.id,
  selector: 'app-aladin-map',
  templateUrl: 'aladin-map.component.html',
  styleUrls: ['aladin-map.component.css']
})
export class AladinMapComponent implements OnInit {
  aladin : any;

  constructor() {}

  ngOnInit() {
      this.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:60});  
  }

}
