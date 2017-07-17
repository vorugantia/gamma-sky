import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

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


  getCatalogs() {

    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.items3FGL = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

    this.catalogService.getCatalog3FHL()
      .then(catalog => {
        this.items3FHL = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

    this.catalogService.getCatalogTeV()
      .then(catalog => {
        this.itemsTeV = catalog.getCatSearchItems();
      })
      .catch(error => this.error = error);

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


  constructor(
    private catalogService: CatalogService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCatalogs();

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
