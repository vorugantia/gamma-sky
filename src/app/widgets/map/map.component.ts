
import { Component, OnInit, OnDestroy } from '@angular/core';
import {PopupTeV} from '../popup/popup-tev';
import {Popup3FGL} from '../popup/popup-3fgl';
import {PopupSNRcat} from '../popup/popup-snrcat';
import {Popup3FHL} from '../popup/popup-3fhl';
import {CatalogService} from '../../services/catalog.service';

import { Router, ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Rx';

// config
import {SURVEYS} from '../../services/surveys';
import {MAP_STATE} from '../../services/map-state';

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

  // Used to configure view
  private sub;
  private target;

  showMap() {
    // Configure view
    let opts = MAP_STATE;
    opts.target = this.target;

    // Initialize Aladin Lite
    this.map = A.aladin("#aladin-lite-div", opts);
    // this.map.gotoRaDec(83.63, 22.01);
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
      .subscribe(catalog => {
        this.addCatalog(
          '3FHL',
          '#DB7F00',
          catalog
        );
        //This hides 3FHL catalog on webpage startup.
        this.cat.hide();
      })
  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .subscribe(catalog => {
        this.addCatalog(
          '3FGL',
          '#09518D',
          catalog
        );
        //This hides 3FGL catalog on webpage startup.
        this.cat.hide();
      })
  }

  getCatalogSNRcat() {
    this.catalogService.getCatalogSNRcat()
      .subscribe(catalog => {
        this.addCatalog(
          'SNRcat',
          '#00A525',
          catalog
        );
        //This hides SNRcat catalog on webpage startup.
        this.cat.hide();
      })
  }
  getCatalogTeV() {
    this.catalogService.getCatalogTeV()
      .subscribe(catalog => {
        this.addCatalog(
          'TeV',
          '#DA0000',
          catalog
        );
      })
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    console.log("aladin map onInit()");

    // Grabs the 'target' query parameter from the URL, to set Aladin map view.
    this.sub = this.activatedRoute
          .queryParams
          .subscribe(params => {
            // The || gives a default value if no parameter is returned.
            // (Adding (+) before params[...] would convert string to number)
            this.target = params['target'] || "0 +0";
            console.log("target: ", this.target);
          });

    this.showMap();
    this.updateSurveys();

    this.getCatalog3FGL();
    this.getCatalogSNRcat();
    this.getCatalogTeV();
    this.getCatalog3FHL();
  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');
    this.sub.unsubscribe();
  }

}
