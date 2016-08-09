import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog2FHL } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-2fhl',
  templateUrl: 'cat-source-2fhl.component.html',
  // styleUrls: ['cat-source-2fhl.component.css'],
  providers: [CatalogService]
})
export class CatSource2FHLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private source;

  private catalog: Catalog2FHL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog2FHL()
      .then(catalog => {
        this.catalog = catalog;
      })
      .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource2FHLComponent...");

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
