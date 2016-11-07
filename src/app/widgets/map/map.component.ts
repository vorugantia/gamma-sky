import { Component, OnInit, OnDestroy } from '@angular/core';
import {Popup} from '../popup/popup';
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

    // Adjusting Column names of JSON files according to catalog name

    var catalog = data;
    var assocType;
    var classType;
    var raType = "RAJ2000";
    var decType = "DEJ2000";

    if(catalogName == "3FGL") {
      assocType = "ASSOC1";
      classType = "CLASS1";
    }
    else if(catalogName == "2FHL") {
      assocType = "ASSOC";
      classType = "CLASS";
    }
    else if(catalogName == "SNRcat") {
      assocType = "id_alt";
    }
    else if(catalogName == "TeV") {
      assocType = "Other_Names";
      classType = "CLASS";
      raType = "RA";
      decType = "DEC";
    }


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

      // var row = i.toString();

      var round_ra = (Math.round(catalog.getVal(i, raType) * 100) / 100).toFixed(2);
      var round_dec = (Math.round(catalog.getVal(i, decType) * 100) / 100).toFixed(2);
      var round_glon = (Math.round(catalog.getVal(i, "GLON") * 100) / 100).toFixed(2);
      var round_glat = (Math.round(catalog.getVal(i, "GLAT") * 100) / 100).toFixed(2);

      var Source = <any>{                    // Can Source object be defined anywhere else, perhaps to be SHARED with CatViewComponent?
        name: catalog.getVal(i, "Source_Name"),
        ra: round_ra,
        dec: round_dec,
        glon: round_glon,
        glat: round_glat
      };

      Source.assoc = catalog.getVal(i, assocType);
      Source.assocLabel = "Assoc:";


      // source.lineFour will:
      //      - Set the SOURCE TYPE for 3FGL and 2FHL catalogs.
      //      - Set the RADIUS for SNRcat catalog.
      // TODO Split these up.
      if (catalogName === "3FGL" || catalogName === "2FHL" || catalogName === "TeV") {
        Source.lineFour = catalog.getVal(i, classType);
        Source.lineFourLabel = "Class:";
      }
      else if (catalogName === "SNRcat") {
        Source.lineFour = ((Math.round(catalog.getVal(i, "size_radio_mean") * 100) / 100) / 60).toFixed(2) + "&#176";
        Source.lineFourLabel = "Radius:";
        Source.SNRcatID = catalog.getVal(i, "snrcat_id");
      }

      if (catalogName === "SNRcat") {
        Source.prefix = "SNRcat ";
      }
      else {
        Source.prefix = "";
      }


      var popup = new Popup(Source, catalogName);
      var marker = A.marker(
        catalog.getVal(i, raType),
        catalog.getVal(i, decType),
        {
          popupDesc: `` + popup.getDesc()
        });

        this.cat.addSources([marker]);

        //This hides all catalogs on webpage startup.
        // this.cat.hide();

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
