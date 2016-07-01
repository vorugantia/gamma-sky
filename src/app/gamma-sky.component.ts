import { Component, OnInit } from '@angular/core';
import { AladinMapComponent } from './aladin-map'

@Component({
  moduleId: module.id,
  selector: 'gamma-sky-app',
  directives: [AladinMapComponent],
  templateUrl: 'gamma-sky.component.html',
  styleUrls: ['gamma-sky.component.css']
})
export class GammaSkyAppComponent implements OnInit {
  title = "GammaSkyAppComponent";

  ngOnInit() {
  }
}
