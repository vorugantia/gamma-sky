import { Component, OnInit } from '@angular/core';

import { Source3FGL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-3fgl',
  templateUrl: 'cat-source-3fgl.component.html',
  styleUrls: ['cat-source-3fgl.component.css'],
  providers: [CatalogService]
})
export class CatSource3FGLComponent implements OnInit {

  private catalog: Source3FGL[];
  private error: any;

  getCatalog() {
    this.catalogService
      .getCatalog3FGL()
      .then(catalog => {
        this.catalog = catalog;
        console.log(this.catalog);
      })
      .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource3FGLComponent...");

    this.getCatalog();
    console.log(this.catalog);

  }

}
