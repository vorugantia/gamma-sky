import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { SourceTeV, Source3FGL, SourceSNRcat, Source3FHL } from './source';
import { CatalogTeV, Catalog3FGL, CatalogSNRcat, Catalog3FHL } from './catalog';


@Injectable()
export class CatalogService {

  getCatalogTeV() {
    // return this.http.get('app/data/cat/cat_tev.json')
    return this.http.get('data/cat/tev/cat.json')
      .toPromise()
      .then(response => {
        console.log(new CatalogTeV(response.json(), SourceTeV));
        return new CatalogTeV( response.json(), SourceTeV )
      })
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

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {}

}
