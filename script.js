// var aladin = A.aladin('#aladin-lite-div', {
//     target: 'helix',
//     // survey: "", //find survey name
//     fov: 1
// });

var aladin = A.aladin('#aladin-lite-div', {target: 'Crab', fov: 50});

aladin.addCatalog(A.catalogFromVizieR('J/ApJS/218/23/table4','Crab', 10, {onClick: 'showTable'}));
