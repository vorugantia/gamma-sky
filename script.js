// The old way:
//
//var aladin = A.aladin(
//   '#aladin-lite-div',
//   {
//     fullScreen: true,
//     showFullscreenControl: false,
//     survey: 'P/Fermi/color',
//     cooFrame: 'galactic',
//     target: '0 +0',
//     fov: 30
//   }
// );
//
// var catalog = A.catalogFromVizieR(
//   'J/ApJS/218/23/table4',
//   'galactic',
//   180, // TODO: Make this load faster
//   {
//     onClick: 'showTable'
//   },
//   function() {
//     aladin.addCatalog(catalog);
//   }
// );

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
    allowFullZoomout: true,  //Hidden attribute
    showShareControl: true,  //Hidden attribute. Developer did not finish it yet.
    // showCatalog: false    //Hidden attribute. This will hide the catalog points on the map, but there's no way to display them again

  });

  console.log(map);
}

// var add_catalog = function(data) {
function add_catalog(catalogName, catalogColor, data) {
  console.log("This is add_catalog");
  var catalog = data;
  var cat = A.catalog({
    name: catalogName,
    color: catalogColor,
    onClick: "showPopup"  //TODO Show the popup on mouse over?
  });
  map.addCatalog(cat);

  var n_sources = Object.keys(catalog.Source_Name).length;
  console.log(n_sources);

  for(var i=0; i < n_sources; i++) {


    var source = {
      name: catalog['Source_Name'][i.toString()],
      ra: catalog['RAJ2000'][i.toString()],
      dec: catalog['DEJ2000'][i.toString()],
      // glon: catalog['GLON'][i.toString()]
      // glon: catalog['GLON'][i.toString()],
      // glat: catalog['GLAT'][i.toString()]

    };
    //TODO Have the above components for source generated from a helper function

    // console.log(source);
    var html_template = $("#source-template").html();
    var template = Handlebars.compile(html_template);
    var popupDesc = template(source);
    var marker = A.marker(
      source.ra,
      source.dec,
      {
        // popupTitle: source.name,
        popupDesc: popupDesc
      });
    cat.addSources([marker]);


  }

}

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

};
$(document).ready(main);

$(document).ready(function(){
    var timesClicked = 0;
    $("#aboutButton").click(function(){
        $("#aboutInfo").toggle();
        timesClicked++;
        if(timesClicked%2 === 0) {
          $(this).html("About");
        }
        else {
          $(this).html("Close");
        }
      });
});

function resizeAboutMargin() {
  var pageWidth  = document.documentElement.clientWidth;

  if(pageWidth > 800) {
    document.getElementById("aboutButton").style.right = "100px";
    document.getElementById("aboutInfo").style.right = "100px";
  }
  if(pageWidth <= 800) {
    document.getElementById("aboutButton").style.right = "50px";
    document.getElementById("aboutInfo").style.right = "50px";
  }
  if(pageWidth > 500) {
    document.getElementById("aboutInfo").style.width = "410px";
  }
  if(pageWidth <= 500) {
    document.getElementById("aboutInfo").style.width = "205px";
  }
}
setInterval(resizeAboutMargin, 0);
