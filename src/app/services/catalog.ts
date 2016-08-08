import { SourceTeV, Source3FGL, Source2FHL, SourceSNRcat } from './source';

/**
 * Helper function to reformat the catalog data into array or source objects.
 */
 function make_catalog(data, sourceClass) {
  let sources = [];
  for (let i = 0; i < data.length; i++) {
    let source = new sourceClass(data[i]);
    sources.push(source);
  }
  return sources;
}


export class CatalogTeV {

  public data: SourceTeV[];

  constructor(data) {
    this.data = make_catalog(data, SourceTeV);
    console.log("CatalogTeV: ", data);
  }

}


export class Catalog3FGL {

  public data: Source3FGL[];

  constructor(data) {
    this.data = make_catalog(data, Source3FGL);
    console.log("Catalog3FGL: ", data);
  }

}

export class Catalog2FHL {

  public data: Source2FHL[];

  constructor(data) {
    this.data = make_catalog(data, Source2FHL);
    console.log("Catalog2FHL: ", data);
  }

}

export class CatalogSNRcat {

  public data: SourceSNRcat[];

  constructor(data) {
    this.data = make_catalog(data, SourceSNRcat);
    console.log("CatalogSNRcat: ", data);
  }

}
