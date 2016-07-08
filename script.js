/*jshint -W069 */

var map;
// var catalog;

function show_map() {
    console.log("This is a show_map");
    map = A.aladin("#aladin-lite-div", {
        fullScreen: true,
        showFullscreenControl: false,
        survey: 'P/Fermi/color',
        cooFrame: 'galactic',
        target: '0 +0',
        fov: 118,
        allowFullZoomout: true, //Hidden attribute
        showShareControl: true, //Hidden attribute. Developer did not finish it yet.
        // showCatalog: false    //Hidden attribute. This will hide the catalog points on the map, but there's no way to display them again

    });

    console.log(map);
}

function add_catalog(catalogName, catalogColor, data) {
    console.log("This is add_catalog");
    var catalog = data;

    var assocType;
    var classType;
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

    //TODO: Make an if statement to just modify the sourceSize of cat for SNRcat
    var cat;
    // if (catalogName == "SNRcat") {
    //     cat = A.catalog({
    //         name: catalogName,
    //         color: catalogColor,
    //         sourceSize: 10,
    //         // onClick: "showPopup"  //TODO Show the popup on mouse over?
    //     });
    // } else {
        cat = A.catalog({
            name: catalogName,
            color: catalogColor,
            sourceSize: 13,
            // onClick: "showPopup"  //TODO Show the popup on mouse over?
        });
    // }
    map.addCatalog(cat);


    var n_sources = Object.keys(catalog.Source_Name).length;
    console.log(n_sources);

    for (var i = 0; i < n_sources; i++) {

        var row = i.toString();

        var round_ra = (Math.round(catalog['RAJ2000'][row] * 100) / 100).toFixed(2);
        var round_dec = (Math.round(catalog['DEJ2000'][row] * 100) / 100).toFixed(2);
        var round_glon = (Math.round(catalog['GLON'][row] * 100) / 100).toFixed(2);
        var round_glat = (Math.round(catalog['GLAT'][row] * 100) / 100).toFixed(2);

        var source = {
            name: catalog['Source_Name'][row],
            ra: round_ra,
            dec: round_dec,
            glon: round_glon,
            glat: round_glat

        };

          source.assoc = catalog[assocType][row];
          source.assocLabel = "Assoc:";

        // source.lineFour will:
        //      - Set the SOURCE TYPE for 3FGL and 2FHL catalogs.
        //      - Set the RADIUS for SNRcat catalog.
        //TODO Split these up.
        if(catalogName === "3FGL" || catalogName === "2FHL") {
          source.lineFour = catalog[classType][row];
          source.lineFourLabel = "Source Type:";
        }
        else if(catalogName === "SNRcat") {
          source.lineFour = ((Math.round(catalog['size_radio_mean'][row] * 100) / 100) / 60).toFixed(2) + "&#176";
          source.lineFourLabel = "Radius:";
        }

        if(catalogName === "SNRcat") {
          source.prefix = "SNRcat ";
        }
        else {
          source.prefix = "";
        }
        //TODO This is all very messy, switch to Angular ASAP

        // var html_template = $("#source-template").html();
        // var template = Handlebars.compile(html_template);
        // var popupDesc = template(source);
        var marker = A.marker(
            catalog['RAJ2000'][row],
            catalog['DEJ2000'][row], {
                // popupTitle: source.name,

                /*jshint multistr: true */
                popupDesc: "\
                            <div> \
                              \
                              <h3 style='text-align:center'>" + source.prefix + source.name + "</h3>  \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>RA:</td> \
                                    <th>" + source.ra + "</th> \
                                    <td>DEC:</td> \
                                    <th>" + source.dec + "</th> \
                                  </tr> \
                                  <tr> \
                                    <td>GLON:</td> \
                                    <th>" + source.glon + "</th> \
                                    <td>GLAT:</td> \
                                    <th>" + source.glat + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>Assoc:</td> \
                                    <th style='width:155px'>" + source.assoc + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                              <table> \
                                <tbody> \
                                  <tr> \
                                    <td>" +  source.lineFourLabel + "</td> \
                                    <th style='width:155px'>" + source.lineFour + "</th> \
                                  </tr> \
                                </tbody> \
                              </table> \
                              \
                            </div> \
                            \
                            " + SNRcatUrl(catalogName, source.glon, source.glat) + " \
                            "
            });

        cat.addSources([marker]);

    }

    // Alternative way of changing the popupDesc. TODO Use this way instead?
    // map.on('objectHovered', function(object) {
    //   if(object) {
    //     //Change popupDesc
    //   }
    //   else {
    //   }
    // });

}

function SNRcatUrl(catalog, glonInput, glatInput) {

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

    /*jshint multistr: true */
    return "<div style='text-align:right; margin-right:4px; font-size:12px'> \
              <a href='http://www.physics.umanitoba.ca/snr/SNRcat/SNRrecord.php?id=" + UrlId + "' target='_blank'>View source on SNRcat</a> \
            </div> \
            ";
  }
  else {
    return "";
  }

}

// function add_overlay(catalogColor, data) {
//
//     console.log("This is add_overlay");
//     var catalog = data;
//
//     var overlay = A.graphicOverlay({
//         color: catalogColor,
//         lineWidth: 3
//     });
//     map.addOverlay(overlay);
//
//     var n_sources = Object.keys(catalog.Source_Name).length;
//     console.log(n_sources);
//
//     for (var i = 0; i < n_sources; i++) {
//
//         var row = i.toString();
//
//         overlay.add(A.circle(
//             catalog['RAJ2000'][row],
//             catalog['DEJ2000'][row],
//             catalog['size_radio_mean'][row] / 60, {
//                 color: catalogColor
//             }
//         ));
//
//     }
//
// }


var main = function() {
    console.log("This is main");
    show_map();
    $.getJSON("data/cat/cat_3fgl.json", function(data) {
        add_catalog(
            "3FGL",
            "red",
            data
        );
    });
    $.getJSON("data/cat/cat_2fhl.json", function(data) {
        add_catalog(
            "2FHL",
            "blue",
            data
        );
    });
    $.getJSON("data/cat/cat_snrcat.json", function(data) {
        add_catalog(
            "SNRcat",
            "green",
            data
        );
        // add_overlay(
        //     "green",
        //     data
        // );
    });

};
$(document).ready(main);


$(document).ready(function() {
    var timesClicked = 0;
    $("#aboutButton").click(function() {
        $("#aboutInfo").toggle();
        timesClicked++;
        if (timesClicked % 2 === 0) {
            $(this).html("About");
        } else {
            $(this).html("Close");
        }
    });
});


function resizeAboutMargin() {
    var pageWidth = document.documentElement.clientWidth;

    if (pageWidth > 800) {
        document.getElementById("aboutButton").style.right = "100px";
        document.getElementById("aboutInfo").style.right = "100px";
    }
    if (pageWidth <= 800) {
        document.getElementById("aboutButton").style.right = "50px";
        document.getElementById("aboutInfo").style.right = "50px";
    }
    if (pageWidth > 500) {
        document.getElementById("aboutInfo").style.width = "410px";
    }
    if (pageWidth <= 500) {
        document.getElementById("aboutInfo").style.width = "205px";
    }
}
setInterval(resizeAboutMargin, 0);

$(window).load(function() {
    $("#load_screen").remove();
    $("#aboutButton").css("position", "absolute");
});
