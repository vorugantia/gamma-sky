var aladin = A.aladin(
  '#aladin-lite-div',
  {
    fullScreen: true,
    showFullscreenControl: false,
    survey: 'P/Fermi/color',
    cooFrame: 'galactic',
    target: '0 +0',
    fov: 30
  }
);

var catalog = A.catalogFromVizieR(
  'J/ApJS/218/23/table4',
  'Crab',
  180, // TODO: Make this load faster
  {
    onClick: 'showTable'
  }
);

aladin.addCatalog(catalog);
