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
      .toPromise()
      .then(response => new CatalogTeV( response.json(), SourceTeV ))
      .catch(this.handleError);
  }

  getCatalog3FHL() {
    return this.http.get('data/cat/3fhl/cat.json')
      .toPromise()
      .then(response => new Catalog3FHL( response.json(), Source3FHL ))
      .catch(this.handleError);
  }

  getCatalog3FGL() {
    return this.http.get('data/cat/3fgl/cat.json')
      .toPromise()
      .then(response => new Catalog3FGL( response.json(), Source3FGL ))
      .catch(this.handleError);
  }

  getCatalogSNRcat() {
    return this.http.get('data/cat/snrcat/cat.json')
      .toPromise()
      .then(response => new CatalogSNRcat( response.json(), SourceSNRcat ))
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
      .toPromise()
      .then(response => new SourceTeV( response.json() ))
      .catch(this.handleError);
  }

  getSource3FHL(id) {
    return this.http.get(this.getSourceDirectory('3fhl', id))
      .toPromise()
      .then(response => new Source3FHL( response.json() ))
      .catch(this.handleError);
  }

  getSource3FGL(id) {
    return this.http.get(this.getSourceDirectory('3fgl', id))
      .toPromise()
      .then(response => new Source3FGL( response.json() ))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

}
