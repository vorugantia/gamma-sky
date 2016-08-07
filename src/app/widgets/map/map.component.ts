import { Component, OnInit, OnDestroy } from '@angular/core';
import { Popup } from '../popup/popup';
// import { ViewEncapsulation } from '@angular/core';


declare var A: any;
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'map',
  templateUrl: 'map.component.html',
  styleUrls: ['map.component.css']
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

      var popup = new Popup("test");

      var marker = A.marker(
        catalog['RAJ2000'][row],
        catalog['DEJ2000'][row],
        {   // TODO Store template somewhere else

          popupDesc: `` + popup.getDesc()
          // popupDesc: `
          //             <style>
          //
          //             .aladin-popup {
          //               width: 270px;
          //               text-align: left;
          //             }
          //
          //             table, table tbody {
          //               width: 270px;
          //               text-align: left;
          //             }
          //
          //             table th {
          //               height: 30px;
          //             }
          //
          //             </style>
          //
          //             <div>
          //
          //               <h3 style='text-align:center'>` + Source.prefix + Source.name + `</h3>
          //
          //                 <table>
          //                   <tbody>
          //                     <tr>
          //                       <td>RA:</td>
          //                       <th>` + Source.ra + `</th>
          //                       <td>DEC:</td>
          //                       <th>` + Source.dec + `</th>
          //                     </tr>
          //                     <tr>
          //                       <td>GLON:</td>
          //                       <th>` + Source.glon + `</th>
          //                       <td>GLAT:</td>
          //                       <th>` + Source.glat + `</th>
          //                     </tr>
          //                   </tbody>
          //                 </table>
          //
          //                 <table>
          //                   <tbody>
          //                     <tr>
          //                       <td>Assoc:</td>
          //                       <th style='width:155px'>` + Source.assoc + `</th>
          //                     </tr>
          //                   </tbody>
          //                 </table>
          //
          //                 <table>
          //                   <tbody>
          //                     <tr>
          //                       <td>` + Source.lineFourLabel + `</td>
          //                       <th style='width:155px'>` + Source.lineFour + `</th>
          //                     </tr>
          //                   </tbody>
          //                 </table>
          //
          //               </div>
          //
          //               ` + this.SNRcatUrl(catalogName, Source.glon, Source.glat) + `
          //               `

        });

        cat.addSources([marker]);

    }

  }



  SNRcatUrl(catalog, glonInput, glatInput) {

    if(catalog == "SNRcat") {

        var glon = glonInput.toString();
        var glat = glatInput.toString();

        var glonD = glon.substring(0, (glon.length - 3));
        var glonM = glon.substring((glon.length - 2), (glon.length - 1));

        var operation;
        var glatD;
        var glatM = glat.substring((glat.length - 2), (glat.length - 1));
        if(glat.substring(0, 1) == "-") {
          glatD = glat.substring(1, (glat.length - 3));
          operation = "m";
        }
        else {
          glatD = glat.substring(0, (glat.length - 3));
          operation = "p";
        }

        if(glonD.length == 1) {
          glonD = "00" + glonD;
        }
        if(glonD.length == 2) {
          glonD = "0" + glonD;
        }

        if(glatD.length == 1) {
          glatD = "0" + glatD;
        }

        var UrlId = "G" + glonD + "." + glonM + operation + glatD + "." + glatM;

        return `<div style='text-align:right; margin-right:4px; font-size:12px'>
                  <a href='http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=` + UrlId + `' target='_blank'>
                    View source on SNRcat
                  </a>
                </div>`;
      }
      else {
        return "";
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
