import { Component, OnInit, OnDestroy } from '@angular/core';
// import {Popup} from '../popup/popup';

// import {CatalogService} from '../../services/catalog.service';
// import {SURVEYS} from '../../data/maps/surveys';

declare var A: any;
declare var HpxImageSurvey: any;
declare var $: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map;

  //private error: any;

  showMap() {
    this.map = A.aladin("#aladin-lite-div", {
      fullScreen: true,
      showFullscreenControl: false,
      survey: "P/Fermi/color",
      cooFrame: "galactic",
      target: "0 +0",
      fov: 180,
      allowFullZoomout: true, //Hidden attribute
      showShareControl: true, //Hidden attribute, not yet working
      // showCatalog: false //Hidden attribute
    });
  }

  constructor() { }

  ngOnInit() {

    console.log("aladin map onInit()");

    this.showMap();

  }

}
