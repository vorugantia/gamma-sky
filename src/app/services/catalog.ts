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

}

export class Catalog2FHL {

  public data: Source2FHL[];

  constructor(data) {

    var sources = [];
    for(var i = 0; i < data.length; i++) {
      var source = new Source2FHL(data[i]);
      sources.push(source);
    }
    this.data = sources;

    console.log("Catalog2FHL: ", data);
  }

}

export class CatalogSNRcat {

  public data: SourceSNRcat[];

  constructor(data) {

    var sources = [];
    for(var i = 0; i < data.length; i++) {
      var source = new SourceSNRcat(data[i]);
      sources.push(source);
    }
    this.data = sources;

    // this.data = data as Source3FGL[];
    console.log("CatalogSNRcat: ", data);
  }

}
