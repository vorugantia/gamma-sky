import {Source3FGL, Source2FHL, SourceSNRcat} from './source';

export class Catalog3FGL {

  public data: Source3FGL[];


  constructor(data) {

    var sources = [];
    for(var i = 0; i < data.length; i++) {
      var source = new Source3FGL(data[i]);
      sources.push(source);
    }
    this.data = sources;

    // this.data = data as Source3FGL[];
    console.log("Catalog3FGL: ", data);
  }

  get_source(id) {
    console.log('get_source', id, this.data[id]);
    return this.data[id];
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
