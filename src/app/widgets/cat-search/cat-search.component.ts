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

  private selectedCat;
  private selectedId;
  private selectedName;
  private error: any;

  myControl;
  options = [];
  filteredOptions: Observable<any[]>;


  // Get search entries from CatalogService
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

  // Creates individual source objects for each search entry
  makeSearchItems(catalog, items, nameCol = 'Source_Name') {
    for(var i = 0; i < catalog.data.length; i++) {
      items.push({
        cat: catalog.catName,
        id: i.toString(),
        name: catalog.data[i][nameCol],
      });
    }
  }

  // Filter items in autocomplete; showing first 5 results for now.
  public filter(val: string): any[] {
    let results;

    if(val) {
      results = this.options.filter( function(s) {
        return s.name.toLowerCase().includes(val.toLowerCase())
      })
      results = results.slice(0,5);
    }
    else {
      results = [];
    }

    return results;
  }

  // Maps controlled value to desired display value in dropdown
  public displayFn(option: any): string {
    return option ? option.name : option;
  }

  // When an item is selected/decselected
  onSelected(evt: MdOptionSelectionChange, option) {
    if(evt.source.selected) { //If an option is selected vs. un-selected
      this.selectedCat = option.cat;
      this.selectedId = option.id;
      this.selectedName = option.name;

      this.router.navigate(['/cat', this.selectedCat, this.selectedId]);
    }
    else {
      // this.router.navigate(['/cat']);
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

    this.filteredOptions = this.myControl.valueChanges
      .startWith(null)
      .map(option => option && typeof option === 'object' ? option.name
                                                          : option)
      .map(name => name ? this.filter(name)
                        : []);//this.options.slice());

  }

  ngDoCheck() {
  }

}
