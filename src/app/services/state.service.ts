import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';

@Injectable()
export class StateService {

  // // Observable string sources
  // public id = new Subject<number>();
  //
  // // Observable string streams
  // selectedId$ = this.id.asObservable();
  //
  private id;

  setSelectedId(id) {
    this.id = id;
    // console.log(this.id);
  }

  getSelectedId() {
    // console.log(this.id);
    return this.id;
  }


  constructor() { }

}
