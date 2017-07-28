import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FHL } from '../../../services/catalog';
import { Source3FHL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-cat-source-3fhl',
  templateUrl: './cat-source-3fhl.component.html',
  providers: [CatalogService]
})
export class CatSource3FHLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private d;

  private catalog: Catalog3FHL;
  private source: Source3FHL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FHL()
      .subscribe(catalog => this.catalog = catalog);
  }

  getSource() {
    this.catalogService.getSource3FHL(this.id)
      .subscribe(source => {
        this.source = source;
        this.d = source.data;
      });
  }

  goToMap() {
    let target = this.source.getTargetString();
    this.router.navigate(['map'], {
      queryParams: {
        target: target,
        fov: 20,
        marker: this.source.cat
      }
    });

  }

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    // TODO params will be replaced by paramMap.
    // (https://angular.io/guide/router#parammap-api) - I made this switch already in MapComponent.
    this.sub = this.activatedRoute.params.subscribe(params => {
      // (the (+) converts string to number)
      let id = +params['id'];
      this.id = id;
      this.getSource();
    });

    this.getCatalog();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
