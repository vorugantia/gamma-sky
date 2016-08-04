import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FGL } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  moduleId: module.id,
  selector: 'cat-source-3fgl',
  templateUrl: 'cat-source-3fgl.component.html',
  styleUrls: ['cat-source-3fgl.component.css'],
  providers: [CatalogService]
})
export class CatSource3FGLComponent implements OnInit, OnDestroy {

  private catalog: Catalog3FGL;
  private error: any;

  private sub;
  private selection;
  private source;

  onSelect(selection) {
    this.selection = selection;
  }

  getCatalog() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.catalog = catalog;
        console.log('bbbbbb', this.catalog);
        this.catalog.get_source(0).print_info();
      })
      .catch(error => this.error = error);
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource3FGLComponent...");

    this.getCatalog();
    console.log(this.catalog);

    // this.sub = this.activatedRoute.params.subscribe(params => {
    //   if (params['id'] !== undefined) {
    //     let id = +params['id'];
    //     console.log('id ', id);
    //
    //     this.catalogService.getSource3FGL(id)
    //       .then(source => {
    //         this.source = source;
    //         console.log('this.source ', this.source);
    //       });
    //   }
    // });

  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
