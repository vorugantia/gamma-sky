import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AppInfoService {

  constructor(private http: Http) {
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  getInfo() {
    return this.http.get('data/app-info.json')
      .map(res => res.json())
      .catch(this.handleError);
  }

}
