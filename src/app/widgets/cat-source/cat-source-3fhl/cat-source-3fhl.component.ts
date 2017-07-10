import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FHL } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'cat-source-3fhl',
  templateUrl: './cat-source-3fhl.component.html',
  styleUrls: ['./cat-source-3fhl.component.css']
})
export class CatSource3FHLComponent implements OnInit {

  private sub;
  private id;
  private source;

  private catalog: Catalog3FHL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FHL()
      .then(catalog => {this.catalog = catalog; })
      .catch(error => this.error = error);
  }

  getSource() {
    return this.catalog.getSource(this.id);
  }

  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Routing to CatSource3FHLComponent...");

    this.getCatalog();

    this.sub = this.activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      console.log('id ', id);
      this.id = id;
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
