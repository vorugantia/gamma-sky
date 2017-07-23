
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PopupTeV} from '../popup/popup-tev';
import {Popup3FGL} from '../popup/popup-3fgl';
import {PopupSNRcat} from '../popup/popup-snrcat';
import {Popup3FHL} from '../popup/popup-3fhl';
import {SURVEYS} from '../../services/surveys';
import {CatalogService} from '../../services/catalog.service';

import {Observable} from 'rxjs/Rx';

declare var A: any;
declare var HpxImageSurvey: any;
declare var $: any;

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private map;
  private cat;
  private error: any;

  showMap() {
    this.map = A.aladin("#aladin-lite-div", {
      fullScreen: true,
      showFullscreenControl: false,
      survey: "P/Fermi/color",
      // survey: "P/Fermi/10GeV",
      cooFrame: "galactic",
      target: "0 +0",
      fov: 180,
      allowFullZoomout: true, //Hidden attribute
      showShareControl: true, //Hidden attribute, not yet working
      // showCatalog: false //Hidden attribute
    });

  }

  updateSurveys() {
    setTimeout(() => {
      HpxImageSurvey.SURVEYS = SURVEYS;
    }, 1000);
  }

// TODO: Go through this function and replace data accesses with functions, which can be defined in catalog.ts.
  addCatalog(catalogName, catalogColor, data) {
    console.log("Adding ", catalogName, " catalog...");

    var catalog = data;

    this.cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: showPopup
    });
    this.map.addCatalog(this.cat);

    // Adding each individual source:
    var n_sources = catalog.data.length;
    console.log(catalogName, " # number of sources: ", n_sources);

    for(var i = 0; i < n_sources; i++) {
      //Configuring the popup
      var popup = this.initializePopup(catalogName, catalog, i);
      var ra = catalog.data[i][catalog.raCol];
      var dec = catalog.data[i][catalog.decCol];

      //Adding the markers
      var marker = A.marker(
        ra,
        dec,
        {
          popupDesc: `` + popup.getDesc()
        });
      this.cat.addSources([marker]);

        //this.cat.hide() will hide all catalogs on webpage startup.
    }

    console.log(catalogName, " loading done");

  }

  initializePopup(catalogName, catalog, source) {
    var popup;

    if(catalogName == 'TeV') {
      popup = new PopupTeV(catalog.data[source]);
    }
    else if(catalogName == '3FHL') {
      popup = new Popup3FHL(catalog.data[source]);
    }
    else if(catalogName == '3FGL') {
      popup = new Popup3FGL(catalog.data[source]);
    }
    else {
      popup = new PopupSNRcat(catalog.data[source]);
    }

    return popup;
  }

  getCatalog3FHL() {
    this.catalogService.getCatalog3FHL()
      .then(catalog => {
        this.addCatalog(
          '3FHL',
          '#DB7F00',
          catalog
        );
        //This hides 3FHL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.addCatalog(
          '3FGL',
          '#09518D',
          catalog
        );
        //This hides 3FGL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }

  getCatalogSNRcat() {
    this.catalogService.getCatalogSNRcat()
      .then(catalog => {
        this.addCatalog(
          'SNRcat',
          '#00A525',
          catalog
        );
        //This hides SNRcat catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalogTeV() {
    // this.catalogService.getCatalogTeV()
    //   .then(catalog => {
    //     this.addCatalogNew(
    //       'TeV',
    //       '#DA0000',
    //       catalog
    //     );
    //     //This hides TeV catalog on webpage startup.
    //     // this.cat.hide();
    //   })
    //   .catch(error => this.error = error);
    this.catalogService.getCatalogTeV()
      .subscribe(catalog => {
        this.addCatalog(
          'TeV',
          '#DA0000',
          catalog
        );
      })
      // .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {

    console.log("aladin map onInit()");

    this.showMap();
    this.updateSurveys();

    this.getCatalog3FGL();
    this.getCatalogSNRcat();
    this.getCatalogTeV();
    this.getCatalog3FHL();
  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');
  }

}
