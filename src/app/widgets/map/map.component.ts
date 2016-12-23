import { Component, OnInit, OnDestroy } from '@angular/core';
import {PopupTeV} from '../popup/popup-tev';
import {Popup3FGL} from '../popup/popup-3fgl';
import {Popup2FHL} from '../popup/popup-2fhl';
import {PopupSNRcat} from '../popup/popup-snrcat';
import {SURVEYS} from '../../data/maps/surveys';

import {CatalogService} from '../../services/catalog.service';

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

  addCatalog(catalogName, catalogColor, data) {
    console.log("Adding ", catalogName, " catalog...");

    var catalog = data;

    //Adding catalog markers and popups

    this.cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: showPopup
    });
    this.map.addCatalog(this.cat);

    var n_sources = catalog.getLength();
    console.log(catalogName, " # number of sources: ", n_sources);

    for(var i = 0; i < n_sources; i++) {

      //Configuring the popup (since each catalog has different column names)

      var popup;
      var Source = <any>{                    // Can Source object be defined anywhere else, perhaps to be SHARED with CatViewComponent?
        name: catalog.getVal(i, "Source_Name"),
        ra: this.round(catalog.getVal(i, 'RAJ2000')),
        dec: this.round(catalog.getVal(i, 'DEJ2000')),
        glon: this.round(catalog.getVal(i, 'GLON')),
        glat: this.round(catalog.getVal(i, 'GLAT')),
      };

      if(catalogName == "TeV") {
        Source.ra = this.round(catalog.getVal(i, 'ra'));
        Source.dec = this.round(catalog.getVal(i, 'dec'));
        Source.glon = this.round(catalog.getVal(i, 'glon'));
        Source.glat = this.round(catalog.getVal(i, 'glat'));
        Source.gammaNames = catalog.getVal(i, 'gamma_names');
        Source.otherNames = catalog.getVal(i, 'other_names');
        popup = new PopupTeV(Source);
      }

      else if(catalogName == "3FGL") {
        Source.assoc = catalog.getVal(i, 'ASSOC1');
        Source.class = catalog.getVal(i, 'CLASS1');
        popup = new Popup3FGL(Source);
      }

      else if(catalogName == "2FHL") {
        Source.assoc = catalog.getVal(i, 'ASSOC');
        Source.class = catalog.getVal(i, 'CLASS');
        popup = new Popup2FHL(Source);
      }

      else {
        Source.assoc = catalog.getVal(i, 'id_alt');
        Source.radius = this.round(catalog.getVal(i, 'size_radio_mean')) + "&#176";
        Source.SNRcatID = catalog.getVal(i, 'snrcat_id');
        popup = new PopupSNRcat(Source);
      }

      //Adding the markers to the map, with popups configured above

      var marker = A.marker(
        Source.ra,
        Source.dec,
        {
          popupDesc: `` + popup.getDesc()
        });

        this.cat.addSources([marker]);

        //this.cat.hide() will hide all catalogs on webpage startup.

    }

  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.addCatalog(
          '3FGL',
          '#8e189d', //purple
          catalog
        );
        //This hides 3FGL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalog2FHL() {
    this.catalogService.getCatalog2FHL()
      .then(catalog => {
        this.addCatalog(
          '2FHL',
          '#1b3bad', //blue
          catalog
        );
        //This hides 2FHL catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalogSNRcat() {
    this.catalogService.getCatalogSNRcat()
      .then(catalog => {
        this.addCatalog(
          'SNRcat',
          'green',
          catalog
        );
        //This hides SNRcat catalog on webpage startup.
        this.cat.hide();
      })
      .catch(error => this.error = error);
  }
  getCatalogTeV() {
    this.catalogService.getCatalogTeV()
      .then(catalog => {
        this.addCatalog(
          'TeV',
          'red',
          catalog
        );
        //This hides TeV catalog on webpage startup.
        // this.cat.hide();
      })
      .catch(error => this.error = error);
  }

  round(val) {
    return (Math.round(val * 100) / 100).toFixed(2);
  }

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {

    console.log("aladin map onInit()");

    this.showMap();

    this.updateSurveys();

    this.getCatalog3FGL();
    this.getCatalog2FHL();
    this.getCatalogSNRcat();
    this.getCatalogTeV();

  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');

  }

}
