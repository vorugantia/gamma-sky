import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupTeV } from '../popup/popup-tev';
import { Popup3FGL } from '../popup/popup-3fgl';
import { PopupSNRcat } from '../popup/popup-snrcat';
import { Popup3FHL } from '../popup/popup-3fhl';
import { CatalogService } from '../../services/catalog.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

// config
import { SURVEYS } from '../../services/surveys';
import { MAP_STATE } from '../../services/map-state';

declare let A: any;
declare let HpxImageSurvey: any;
declare let CooConversion: any;

@Component({
  selector: 'app-map',
  template: `<div id="aladin-lite-div" (mouseup)="updateUrl()"></div>`,
  // (scroll) event not working? https://github.com/angular/angular/issues/17015
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private map;
  private cat;

  // Used to configure view
  private sub;
  private target;
  private fov;
  private marker;

  showMap() {
    // Configure view
    let opts = MAP_STATE;
    opts.target = this.target;
    opts.fov = this.fov;

    // Initialize Aladin Lite
    this.map = A.aladin('#aladin-lite-div', opts);
  }

  updateSurveys() {
    setTimeout(() => {
      HpxImageSurvey.SURVEYS = SURVEYS;
    }, 1000);
  }

// TODO: Go through this function and replace data accesses with functions, which can be defined in catalog.ts.
  addCatalog(catalogName, catalogColor, data) {

    let catalog = data;

    this.cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: showPopup
    });
    this.map.addCatalog(this.cat);

    // Adding each individual source:
    const n_sources = catalog.data.length;

    for (let i = 0; i < n_sources; i++) {
      // Configuring the popup
      let popup = initializePopup(catalogName, catalog, i);
      const ra = catalog.data[i][catalog.raCol];
      const dec = catalog.data[i][catalog.decCol];

      // Adding the markers
      const marker = A.marker(
        ra,
        dec,
        {
          popupDesc: `` + popup.getDesc()
        });
      this.cat.addSources([marker]);

      // this.cat.hide() will hide all catalogs on webpage startup.
    }

  }

  getCatalog3FHL() {
    this.catalogService.getCatalog3FHL()
      .subscribe(catalog => {
        this.addCatalog(
          '3FHL',
          '#DB7F00',
          catalog
        );
        this.hideCatalog('3fhl');
      });
  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .subscribe(catalog => {
        this.addCatalog(
          '3FGL',
          '#09518D',
          catalog
        );
        this.hideCatalog('3fgl');
      });
  }

  getCatalogSNRcat() {
    this.catalogService.getCatalogSNRcat()
      .subscribe(catalog => {
        this.addCatalog(
          'SNRcat',
          '#00A525',
          catalog
        );
        this.hideCatalog('snrcat');
      });
  }

  getCatalogTeV() {
    this.catalogService.getCatalogTeV()
      .subscribe(catalog => {
        this.addCatalog(
          'TeV',
          '#DA0000',
          catalog
        );
        // We always want to show the markers for TeV sources. No need to hide.
        // this.hideCatalog('tev');
      });
  }

  hideCatalog(catName) {
    if (catName !== this.marker) {
      this.cat.hide();
    }
  }

  updateUrl() {
    let dynamicGlonGlat = CooConversion.J2000ToGalactic(
      [
        this.map.getRaDec()[0],
        this.map.getRaDec()[1]
      ]);
    let dynamicTarget = dynamicGlonGlat[0].toFixed(3) + ','
      + dynamicGlonGlat[1].toFixed(3);
    let dynamicFov = this.map.getFov()[0].toFixed(3).toString();

    let dynamicParams = 'target=' + dynamicTarget + '&fov=' + dynamicFov
      + '&marker=' + this.marker;

    // Update the URL (without refreshing page) as Map View changes.
    // TODO: Only call this on mouse scroll (event listener needed.)
    this.location.go('/map', dynamicParams); // '/map' or 'map'?

  }

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              // private router: Router,
              private location: Location
              // private params: Params
  ) {
  }

  ngOnInit() {
    // Grabs parameters from the URL and uses them to set up Aladin map view.
    this.sub = this.activatedRoute
      .queryParams
      .subscribe(params => {
        // The || gives a default value if no parameter is returned.
        this.target = params['target'] || '0 +0';
        this.fov = params['fov'] || '180';
        this.marker = params['marker'] || 'tev';
      });

    this.showMap();
    this.updateSurveys();

    this.getCatalog3FGL();
    this.getCatalogSNRcat();
    this.getCatalogTeV();
    this.getCatalog3FHL();

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}


function initializePopup(catalogName, catalog, source) {
  if (catalogName === 'TeV') {
    return new PopupTeV(catalog.data[source]);
  } else if (catalogName === '3FHL') {
    return new Popup3FHL(catalog.data[source]);
  } else if (catalogName === '3FGL') {
    return new Popup3FGL(catalog.data[source]);
  } else {
    return new PopupSNRcat(catalog.data[source]);
  }
}
