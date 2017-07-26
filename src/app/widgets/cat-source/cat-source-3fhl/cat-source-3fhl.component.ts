import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FHL } from '../../../services/catalog';
import { Source3FHL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-3fhl',
  templateUrl: './cat-source-3fhl.component.html',
  styleUrls: ['./cat-source-3fhl.component.css'],
  providers: [CatalogService]
})
export class CatSource3FHLComponent implements OnInit {

  private sub;
  private id;
  private d;

  private catalog: Catalog3FHL;
  private source: Source3FHL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FHL()
      .subscribe(catalog => this.catalog = catalog );
  }

  getSource() {
    this.catalogService.getSource3FHL(this.id)
      .subscribe(source => {
        this.source = source;
        this.d = source.data;
      });
  }

  isExtended() {
    return this.source.is_extended();
  }
  isLogParabola() {
    if(this.d.SpectrumType.trim() == 'LogParabola')
      return true;
    return false;
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Routing to CatSource3FHLComponent...");

    // TODO params will be replaced by paramMap  https://angular.io/guide/router#parammap-api
    this.sub = this.activatedRoute.params.subscribe(params => {
      // (the (+) converts string to number)
      let id = +params['id'];
      console.log('id ', id);
      this.id = id;
      this.getSource();
    });

    this.getCatalog();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
