import { Component, OnInit, OnDestroy } from '@angular/core';
import { Popup } from '../popup/popup';
// import { ViewEncapsulation } from '@angular/core';


declare var A: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, OnDestroy {

  private map;
  // private catalog;
  // private cat;

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


    var n_sources = Object.keys(catalog.Source_Name).length;
    console.log(catalogName, " # of sources: ", n_sources);

    for (var i = 0; i < n_sources; i++) {

      var row = i.toString();

      var round_ra = (Math.round(catalog['RAJ2000'][row] * 100) / 100).toFixed(2);
      var round_dec = (Math.round(catalog['DEJ2000'][row] * 100) / 100).toFixed(2);
      var round_glon = (Math.round(catalog['GLON'][row] * 100) / 100).toFixed(2);
      var round_glat = (Math.round(catalog['GLAT'][row] * 100) / 100).toFixed(2);

      var Source = <any>{                    // Can Source object be defined anywhere else, perhaps to be SHARED with CatViewComponent?
        name: catalog["Source_Name"][row],
        ra: round_ra,
        dec: round_dec,
        glon: round_glon,
        glat: round_glat
      };

      Source.assoc = catalog[assocType][row];
      Source.assocLabel = "Assoc:";

      // source.lineFour will:
      //      - Set the SOURCE TYPE for 3FGL and 2FHL catalogs.
      //      - Set the RADIUS for SNRcat catalog.
      // TODO Split these up.
      if (catalogName === "3FGL" || catalogName === "2FHL") {
        Source.lineFour = catalog[classType][row];
        Source.lineFourLabel = "Source Type:";
      }
      else if (catalogName === "SNRcat") {
        Source.lineFour = ((Math.round(catalog['size_radio_mean'][row] * 100) / 100) / 60).toFixed(2) + "&#176";
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
        catalog['RAJ2000'][row],
        catalog['DEJ2000'][row],
        {
          popupDesc: `` + popup.getDesc()
        });

        cat.addSources([marker]);

    }

  }


  constructor() { }

  ngOnInit() {

    console.log('aladin map OnInit');

    this.showMap();

    $.getJSON('app/data/cat/cat_3fgl.json', (data) => {
      this.addCatalog(
        '3FGL',
        'red',
        data
      );
    });

    $.getJSON('app/data/cat/cat_2fhl.json', (data) => {
      this.addCatalog(
        '2FHL',
        'blue',
        data
      );
    });

    $.getJSON('app/data/cat/cat_snrcat.json', (data) => {
      this.addCatalog(
        'SNRcat',
        'green',
        data
      );
    });

  }

  ngOnDestroy() {
    console.log('aladin map OnDestroy');

  }

}
