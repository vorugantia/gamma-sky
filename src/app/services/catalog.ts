import {Source3FGL, Source2FHL, SourceSNRcat} from './source';

export class Catalog3FGL {

  public data: Source3FGL[];

  constructor(data) {
    this.data = data as Source3FGL[];
    console.log("Catalog3FGL: ", data);
  }

}

export class Catalog2FHL {

  public data: Source2FHL[];

  constructor(data) {
    this.data = data as Source2FHL[];
    console.log("Catalog2FHL: ", data);
  }

}

export class CatalogSNRcat {

  public data: SourceSNRcat[];

  constructor(data) {
    this.data = data as SourceSNRcat[];
    console.log("CatalogSNRcat: ", data);
  }

}
