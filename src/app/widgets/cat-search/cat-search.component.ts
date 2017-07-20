import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { MdOptionSelectionChange } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'cat-search',
  templateUrl: './cat-search.component.html',
  styleUrls: ['./cat-search.component.css']
})
export class CatSearchComponent implements OnInit, DoCheck {

  private selectedId;
  // private catalog;
  private error: any;

  private items3FGL;
  private items3FHL;
  private itemsTeV;

  myControl;
  options = [];
  selectedName;
  filteredOptions: Observable<any[]>;

  getCatSearchItems() {
    let items = [];

    this.catalogService.getCatalogTeV()
      .then(catalog => this.makeSearchItems(catalog, items, 'common_name'))
      .catch(error => this.error = error);
    this.options = items;

    this.catalogService.getCatalog3FHL()
      .then(catalog => this.makeSearchItems(catalog, items))
      .catch(error => this.error = error);
    this.options.concat(items);

    this.catalogService.getCatalog3FGL()
      .then(catalog => this.makeSearchItems(catalog, items))
      .catch(error => this.error = error);
    this.options.concat(items);
  }


  //TODO remove the three methods below - they are for the old autocomplete (NOT makeSearchItems())
  getCatSearchItemsTeV() {
    let items = [];
    this.catalogService.getCatalogTeV()
      .then(catalog => this.makeSearchItems(catalog, items, 'common_name'))
      .catch(error => this.error = error);
    this.itemsTeV = items;
  }
  getCatSearchItems3FHL() {
    let items = [];
    this.catalogService.getCatalog3FHL()
      .then(catalog => this.makeSearchItems(catalog, items))
      .catch(error => this.error = error);
    this.items3FHL = items;
  }
  getCatSearchItems3FGL() {
    let items = [];
    this.catalogService.getCatalog3FGL()
      .then(catalog => this.makeSearchItems(catalog, items))
      .catch(error => this.error = error);
    this.items3FGL = items;
  }

  makeSearchItems(catalog, items, nameCol = 'Source_Name') {
    for(var i = 0; i < catalog.data.length; i++) {
      items.push({
        text: catalog.data[i][nameCol],
        id: i.toString()
      });
    }
  }

  setItems(items) {
    this.items = items;
  }


  // To understand the code below, see ng2-select and ngx-bootstrap docs at:
  // http://valor-software.com/ng2-select/
  // http://valor-software.com/ngx-bootstrap/

  public items: Array<any> = [];
  private value: any = {};
  public selectedCatalog;
  private tooltip;
  private disabled: boolean = false;


  public selected(value: any): void {
    console.log('Selected value is: ', value);

    this.router.navigate(['/cat', this.selectedCatalog, value.id]);


  }

  public removed(value: any): void {
    console.log('Removed value is: ', value);

    this.router.navigate(['/cat']);
  }

  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }

  // Filter the angular2 material dropdown
  // filter(text: string): any[] {
  //    return this.options.filter(option => new RegExp(`^${text}`, 'gi').test(option.text));
  // }
  public filter(val: string): any[] {
  return val ? this.options.filter(s =>
    s.text.toLowerCase().includes(val.toLowerCase()))
             : this.options;
  }

  // Maps controled value to desired display value in dropdown
  public displayFn(option: any): string {
    return option ? option.text : option;
  }

  // When an item is selected
  onSelected(evt: MdOptionSelectionChange, option) {
    if(evt.source.selected) { //If an option is selected vs. un-selected
      console.log("selected ", option.text);
      this.selectedName = option.text;
    }
    else {
      console.log('un-selected ', option.text);
    }
  }


  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.myControl = new FormControl();
  }

  ngOnInit() {
    this.getCatSearchItems();
    this.getCatSearchItemsTeV();
    this.getCatSearchItems3FHL();
    this.getCatSearchItems3FGL();

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(option => option && typeof option === 'object' ? option.text
                                                          : option)
      .map(text => text ? this.filter(text) : this.options.slice());

    this.selectedName = 'None selected';

  }

  ngDoCheck() {
    if (this.selectedCatalog == null) {
      this.disabled = true;
      this.tooltip = false;
      // this.items = [];
    }
    else {
      this.disabled = false;
      this.tooltip = true;
    }
  }

}
