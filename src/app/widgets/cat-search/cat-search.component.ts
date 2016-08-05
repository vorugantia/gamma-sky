import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass } from '@angular/common';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';
import { SELECT_DIRECTIVES } from 'ng2-select';

@Component({
  moduleId: module.id,
  selector: 'cat-search',
  templateUrl: 'cat-search.component.html',
  styleUrls: ['cat-search.component.css'],
  directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES]
})
export class CatSearchComponent implements OnInit {

  // private selectedCat;
  //
  // onSelectChange(value) {
  //   this.router.navigate(['/cat', value]);
  //   this.selectedCat = value;
  // }
  // constructor(private router: Router) { }

  public items:Array<string> = ['Item1', 'Item2', 'Item3'];

  private value:any = {};
  private _disabledV:string = '0';
  private disabled:boolean = false;

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value:string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  constructor() {}

  ngOnInit() {
  }

}
