import { SourceTeV, Source3FGL, SourceSNRcat, Source3FHL } from './source';

class CatalogBase {

  public data;
  public sourceClass;

  constructor(data, sourceClass) {
    this.data = data;
    this.sourceClass = sourceClass;
  }

  // default column names.
  public sourceNameCol = "Source_Name";
  public raCol = "RAJ2000";
  public decCol = "DEJ2000";

  getVal(idx, colname) {
    return this.getSource(idx)[colname];
  }

  getSource(idx) {
    return this.data[idx];
  }

  getCatSearchItems() {
    let items = [];

    for(var i = 0; i < this.data.length; i++) {
      items.push({
        text: this.getVal(i, this.sourceNameCol),
        id: i.toString()
      });
    }
    return items;
  }

}

export class CatalogTeV extends CatalogBase {

  public sourceNameCol = "common_name";
  public raCol = "ra";
  public decCol = "dec";

  printInfo(idx) {
    console.log(this.data[idx]);
  }

}

export class Catalog3FHL extends CatalogBase {

  printInfo(idx) {
    console.log(this.data[idx]);
  }

}

export class Catalog3FGL extends CatalogBase {

  printInfo(idx) {
    console.log(this.data[idx]);
  }

}

export class CatalogSNRcat extends CatalogBase {

  printInfo(idx) {
    console.log(this.data[idx]);
  }

}
