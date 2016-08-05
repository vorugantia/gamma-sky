import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FGL } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-3fgl',
  templateUrl: 'cat-source-3fgl.component.html',
  styleUrls: ['cat-source-3fgl.component.css'],
  providers: [CatalogService]
})
export class CatSource3FGLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private source;

  private catalog: Catalog3FGL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.catalog = catalog;
        console.log(catalog);
        console.log(this.catalog);
      })
      .catch(error => this.error = error);
  }


  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource3FGLComponent...");

    this.getCatalog();

    this.sub = this.activatedRoute.params.subscribe(params => {
        let id = +params['id'];
        console.log('id ', id);
        this.id = id;

        // this.stateService.setSelectedId(id);
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
