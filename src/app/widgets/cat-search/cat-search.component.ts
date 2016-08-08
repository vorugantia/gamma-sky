import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { CORE_DIRECTIVES, NgClass } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import { BUTTON_DIRECTIVES, ButtonRadioDirective, ButtonCheckboxDirective, TOOLTIP_DIRECTIVES } from 'ng2-bootstrap';
import { SELECT_DIRECTIVES } from 'ng2-select';

import { CatalogService } from '../../services/catalog.service';
import { StateService } from '../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-search',
  templateUrl: 'cat-search.component.html',
  styleUrls: ['cat-search.component.css'],
  providers: [CatalogService],
  directives: [SELECT_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, BUTTON_DIRECTIVES, ButtonRadioDirective, ButtonCheckboxDirective, TOOLTIP_DIRECTIVES]
})
export class CatSearchComponent implements OnInit, DoCheck {

  private selectedId;
  private catalog;
  private error: any;


  getCatalog(catalog) {

    var cat;
    var prefix;

    if(catalog == '3FGL') {
      cat = this.catalogService.getCatalog3FGL();
      prefix = "";
    }
    else if(catalog == '2FHL') {
      cat = this.catalogService.getCatalog2FHL();
      prefix = "";
    }
    else if(catalog == 'SNRcat') {
      cat = this.catalogService.getCatalogSNRcat();
      prefix = "SNRcat ";
    }
    else if(catalog == 'TeV') {
      cat = this.catalogService.getCatalogTeV();
      prefix = "";
    }

    cat.then(catalog => {
      this.catalog = catalog;

      if(this.items !== []) {
        this.items = [];
      }

      for(var i = 0; i < this.catalog.data.index.length; i++) {
        this.items.push({
          text: prefix + this.catalog.getSourceByRowIndex(i).data.Source_Name,
          id: this.catalog.getID(i).toString() // If not toString(), ng2-select thinks an id of 0 is null.
        });
      }
      console.log('items: ', this.items);

    })
    .catch(error => this.error = error);

  }


  // To understand the code below, see ng2-select and ng2-bootstrap docs at:
  // http://valor-software.com/ng2-select/
  // https://valor-software.com/ng2-bootstrap/

  public items:Array<any> = [];
  private value:any = {};
  public selectedCatalog;
  private tooltip;
  private disabled:boolean = false;


  public selected(value:any):void {
    console.log('Selected value is: ', value);

    // this.stateService.setSelectedId(value.id);

      this.router.navigate(['/cat', this.selectedCatalog, value.id]);


  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);

    this.router.navigate(['/cat']);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private router: Router
  ) {}

  ngOnInit() {

  }

  ngDoCheck() {
    if(this.selectedCatalog == null) {
      this.disabled = true;
      this.tooltip = true;
      // this.items = [];
    }
    else {
      this.disabled = false;
      this.tooltip = false;
    }
  }

}