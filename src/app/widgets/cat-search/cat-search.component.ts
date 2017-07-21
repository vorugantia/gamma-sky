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

  // private selectedId;
  // private catalog;
  private error: any;

  private items3FGL;
  private items3FHL;
  private itemsTeV;

  myControl;
  options = [];
  private selectedCat;
  private selectedId;
  private selectedName;
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
        cat: catalog.catName,
        id: i.toString(),
        name: catalog.data[i][nameCol],
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
  // filter(name: string): any[] {
  //    return this.options.filter(option => new RegExp(`^${name}`, 'gi').test(option.name));
  // }

  // public filter(val: string): any[] {
  // return val ? this.options.filter(s =>
  //   s.name.toLowerCase().includes(val.toLowerCase()))
  //                          .slice(0,100)
  //            : this.options;
  // }
  public filter(val: string): any[] {
    let results;

    if(val) {
      results = this.options.filter( function(s) {
        return s.name.toLowerCase().includes(val.toLowerCase())
      })
      results = results.slice(0,5); // 5 options removes the scrollbar.
    }
    else {
      results = [];
    }

    return results;
  }



  // Maps controled value to desired display value in dropdown
  public displayFn(option: any): string {
    return option ? option.name : option;
  }

  // When an item is selected
  onSelected(evt: MdOptionSelectionChange, option) {
    if(evt.source.selected) { //If an option is selected vs. un-selected
      this.selectedCat = option.cat;
      this.selectedId = option.id;
      this.selectedName = option.name;

      this.router.navigate(['/cat', this.selectedCat, this.selectedId]);
    }
    else {
      //TODO Go to CatHelpComponent (once we add "remove selection" button)
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
      .map(option => option && typeof option === 'object' ? option.name
                                                          : option)
      .map(name => name ? this.filter(name)
                        : []);//this.options.slice());

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
