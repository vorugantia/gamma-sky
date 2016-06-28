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
var catalog;

function show_map() {
  console.log("This is a show_map");
  map = A.aladin("#aladin-lite-div", {
    fullScreen: true,
    showFullscreenControl: false,
    survey: 'P/Fermi/color',
    cooFrame: 'galactic',
    target: '0 +0',
    fov: 30
  });
  console.log(map);
}

var add_catalog = function(data) {
  console.log("This is add_catalog");
  catalog = data.data;
  console.log(data);
  console.log(catalog);
  var cat = A.catalog();
  map.addCatalog(cat);

  for(var i=0; i < catalog.length; i++) {
    console.log(i, catalog[i]);
    var source = catalog[i];
    var marker = A.marker(source.ra, source.dec);
    cat.addSources([marker]);
    console.log(marker);
  }
};

var main = function() {
  console.log("This is main");

  show_map();

  console.log("Fetching catalog data...");
  window.setTimeout(
    function() {
      $.getJSON("data/data.json", add_catalog);
    },
    [5000]
  );
  console.log("After the getJSON call...");

  // add_catalog();
  //console.log("Adding catalog...");
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
