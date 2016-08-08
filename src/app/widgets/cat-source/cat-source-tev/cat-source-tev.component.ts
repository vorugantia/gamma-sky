import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogTeV } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-tev',
  templateUrl: 'cat-source-tev.component.html',
  // styleUrls: ['cat-source-tev.component.css'],
  providers: [CatalogService]
})
export class CatSourceTeVComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private source;

  private catalog: CatalogTeV;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalogTeV()
      .then(catalog => { this.catalog = catalog; })
      .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSourceTeVComponent...");

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
