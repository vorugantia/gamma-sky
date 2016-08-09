import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogSNRcat } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-snrcat',
  templateUrl: 'cat-source-snrcat.component.html',
  styleUrls: ['cat-source-snrcat.component.css'],
  providers: [CatalogService]
})
export class CatSourceSNRcatComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private source;

  private catalog: CatalogSNRcat;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalogSNRcat()
      .then(catalog => {
        this.catalog = catalog;
        console.log(catalog);

        console.log(this.catalog.getSNRcatID(this.id));

      })
      .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSourceSNRcatComponent...");

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
