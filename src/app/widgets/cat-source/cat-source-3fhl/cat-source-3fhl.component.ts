import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FHL } from '../../../services/catalog';
import { Source3FHL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-3fhl',
  templateUrl: './cat-source-3fhl.component.html',
  styleUrls: ['./cat-source-3fhl.component.css']
})
export class CatSource3FHLComponent implements OnInit {

  private sub;
  private id;

  private catalog: Catalog3FHL;
  private source: Source3FHL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FHL()
      .then(catalog => {this.catalog = catalog; })
      .catch(error => this.error = error);
  }

  getSource() {
    this.catalogService.getSource3FHL(this.id)
      .then(source => { this.source = source; })
      .catch (error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log("Routing to CatSource3FHLComponent...");

    this.getCatalog();

    this.sub = this.activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      console.log('id ', id);
      this.id = id;
      this.getSource();
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
