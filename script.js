var aladin = A.aladin(
  '#aladin-lite-div',
  {
    target: 'Crab',
    fov: 30
  }
);

var catalog = A.catalogFromVizieR(
  'J/ApJS/218/23/table4',
  'Crab',
  10,
  {
    onClick: 'showTable'
  }
);

aladin.addCatalog(catalog);
