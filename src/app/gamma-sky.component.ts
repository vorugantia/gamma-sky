import { Component, OnInit } from '@angular/core';
declare var $:any;
declare var A:any;

@Component({
  moduleId: module.id,
  selector: 'gamma-sky-app',
  templateUrl: 'gamma-sky.component.html',
  styleUrls: ['gamma-sky.component.css']
})
export class GammaSkyAppComponent implements OnInit {
  aladin : any;
  title = "GammaSkyAppComponent";

  ngOnInit() {
    // var element = $('#aladin-lite-div');
    // console.log(element);

    this.aladin = A.aladin('#aladin-lite-div', {survey: "P/DSS2/color", fov:60});  
  }
}
