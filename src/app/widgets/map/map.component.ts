import { Component, OnInit, OnDestroy } from '@angular/core';
import { Popup } from '../popup/popup';
// import { ViewEncapsulation } from '@angular/core';

import {CatalogService} from '../../services/catalog.service';


declare var A: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  providers: [CatalogService]
  // encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {

  private map;
  // private catalog;
  // private cat;
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

  addCatalog(catalogName, catalogColor, data) {
    console.log('Adding ', catalogName, ' catalog...');


    var catalog = data;
    var assocType;
    var classType;

    if (catalogName == "3FGL") {
      assocType = "ASSOC1";
      classType = "CLASS1";
    }
    else if (catalogName == "2FHL") {
      assocType = "ASSOC";
      classType = "CLASS";
    }
    else if (catalogName == "SNRcat") {
      assocType = "id_alt";
    }

    var cat = A.catalog({
      name: catalogName,
      color: catalogColor,
      sourceSize: 13,
      // onClick: "showPopup"  //TODO Show popup on mouseover?
    });
    this.map.addCatalog(cat);


    var n_sources = catalog.data.index.length;
    console.log(catalogName, " # of sources: ", n_sources);

    for (var i = 0; i < n_sources; i++) {

      // var row = i.toString();

      var round_ra = (Math.round(catalog.getSourceByRowIndex(i).data.RAJ2000 * 100) / 100).toFixed(2);
      var round_dec = (Math.round(catalog.getSourceByRowIndex(i).data.DEJ2000 * 100) / 100).toFixed(2);
      var round_glon = (Math.round(catalog.getSourceByRowIndex(i).data.GLON * 100) / 100).toFixed(2);
      var round_glat = (Math.round(catalog.getSourceByRowIndex(i).data.GLAT * 100) / 100).toFixed(2);

      var Source = <any>{                    // Can Source object be defined anywhere else, perhaps to be SHARED with CatViewComponent?
        name: catalog.getSourceByRowIndex(i).data.Source_Name,
        ra: round_ra,
        dec: round_dec,
        glon: round_glon,
        glat: round_glat
      };

      Source.assoc = catalog.getSourceByRowIndex(i).data[assocType];
      Source.assocLabel = "Assoc:";


      // source.lineFour will:
      //      - Set the SOURCE TYPE for 3FGL and 2FHL catalogs.
      //      - Set the RADIUS for SNRcat catalog.
      // TODO Split these up.
      if (catalogName === "3FGL" || catalogName === "2FHL") {
        Source.lineFour = catalog.getSourceByRowIndex(i).data[classType];
        Source.lineFourLabel = "Source Type:";
      }
      else if (catalogName === "SNRcat") {
        Source.lineFour = ((Math.round(catalog.getSourceByRowIndex(i).data.size_radio_mean * 100) / 100) / 60).toFixed(2) + "&#176";
        Source.lineFourLabel = "Radius:";
      }

      if (catalogName === "SNRcat") {
        Source.prefix = "SNRcat ";
      }
      else {
        Source.prefix = "";
      }


      var popup = new Popup(Source, catalogName);
      var marker = A.marker(
        catalog.getSourceByRowIndex(i).data.RAJ2000,
        catalog.getSourceByRowIndex(i).data.DEJ2000,
        {
          popupDesc: `` + popup.getDesc()
        });

        cat.addSources([marker]);

    }

  }

  getCatalog3FGL() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.addCatalog(
          '3FGL',
          'red',
          catalog
        );
      })
      .catch(error => this.error = error);
  }
  getCatalog2FHL() {
    this.catalogService.getCatalog2FHL()
      .then(catalog => {
        this.addCatalog(
          '2FHL',
          'blue',
          catalog
        );
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
      })
      .catch(error => this.error = error);
  }
  // getCatalogTeV() {
  //   this.catalogService.getCatalogTeV()
  //     .then(catalog => {
  //       this.catalog = catalog;
  //     })
  //     .catch(error => this.error = error);
  // }

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {

    console.log('aladin map OnInit');

    this.showMap();

    this.getCatalog3FGL();
    this.getCatalog2FHL();
    this.getCatalogSNRcat();


  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');

  }

}
