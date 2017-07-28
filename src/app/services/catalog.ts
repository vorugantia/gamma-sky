class CatalogBase {

  public data;
  public sourceClass;

  // default column names.
  public sourceNameCol = 'Source_Name';
  public raCol = 'RAJ2000';
  public decCol = 'DEJ2000';

  constructor(data, sourceClass) {
    this.data = data;
    this.sourceClass = sourceClass;
  }
}

export class CatalogTeV extends CatalogBase {
  public catName = 'tev';
  public sourceNameCol = 'common_name';
  public raCol = 'ra';
  public decCol = 'dec';
}

export class Catalog3FHL extends CatalogBase {
  public catName = '3fhl';
}

export class Catalog3FGL extends CatalogBase {
  public catName = '3fgl';
}

export class CatalogSNRcat extends CatalogBase {
}
