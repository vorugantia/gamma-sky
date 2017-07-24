import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { SourceTeV, Source3FGL, SourceSNRcat, Source3FHL } from './source';
import { CatalogTeV, Catalog3FGL, CatalogSNRcat, Catalog3FHL } from './catalog';


@Injectable()
export class CatalogService {

// Fetch catalog data
  getCatalogTeV() {
    return this.http.get('data/cat/tev/cat.json')
      .map(res => res.json())
      .map(cat => new CatalogTeV(cat, SourceTeV))
      .catch(this.handleError);
  }

  getCatalog3FHL() {
    return this.http.get('data/cat/3fhl/cat.json')
      .map(res => res.json())
      .map(cat => new Catalog3FHL(cat, Source3FHL))
      .catch(this.handleError);
  }

  getCatalog3FGL() {
    return this.http.get('data/cat/3fgl/cat.json')
      .map(res => res.json())
      .map(cat => new Catalog3FGL(cat, Source3FGL))
      .catch(this.handleError);
  }

  getCatalogSNRcat() {
    return this.http.get('data/cat/snrcat/cat.json')
      .map(res => res.json())
      .map(cat => new CatalogSNRcat(cat, SourceSNRcat))
      .catch(this.handleError);
  }

// Fetch source data
  getSourceDirectory(cat, id) {
    var str = id.toString();
    var pad = "0000";
    var s = pad.substring(0, pad.length - str.length) + str;
    return `data/cat/${cat}/sources/${s}/data.json`;
  }

  getSourceTeV(id) {
    return this.http.get(this.getSourceDirectory('tev', id))
      .map(res => res.json())
      .map(source => new SourceTeV(source))
      .catch(this.handleError);
  }

  getSource3FHL(id) {
    return this.http.get(this.getSourceDirectory('3fhl', id))
      .map(res => res.json())
      .map(source => new Source3FHL(source))
      .catch(this.handleError);
  }

  getSource3FGL(id) {
    return this.http.get(this.getSourceDirectory('3fgl', id))
      .map(res => res.json())
      .map(source => new Source3FGL(source))
      .catch(this.handleError);
  }

  getSourceSNRcat(id) {
    return this.http.get(this.getSourceDirectory('snrcat', id))
      .map(res => res.json())
      .map(source => new SourceSNRcat(source))
      .catch(this.handleError);
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

}
