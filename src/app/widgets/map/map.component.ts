import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';


declare var A: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  encapsulation: ViewEncapsulation.None  // This allows the MapComponent to define styles that can affect
                                         // the whole application - what we need for #aladin-lite-div
})
export class MapComponent implements OnInit, OnDestroy {

  private map;

  onInitConfig() {
    document.body.style.backgroundColor = "black";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
  }

  onDestroyConfig() {
    document.body.style.backgroundColor = "white";
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }

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
    })
  }

  constructor() { }

  ngOnInit() {

    console.log('aladin map OnInit');
    this.onInitConfig();

    this.showMap();




  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');
    this.onDestroyConfig();

  }

}
