import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogTeV } from '../../../services/catalog';
import { SourceTeV } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-cat-source-tev',
  templateUrl: './cat-source-tev.component.html',
  providers: [CatalogService]
})
export class CatSourceTeVComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private d;

  private catalog: CatalogTeV;
  private source: SourceTeV;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalogTeV()
      .subscribe(catalog => this.catalog = catalog);
  }

  getSource() {
    this.catalogService.getSourceTeV(this.id)
      .subscribe(source => {
        this.source = source;
        this.d = source.data;
      });
  }

  goToMap() {
    let target = this.source.getTargetString('glon', 'glat');
    this.router.navigate(['map'], {
      queryParams: {
        target: target,
        fov: 20,
        marker: 'tev'
      }
    });
  }

  constructor(private catalogService: CatalogService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {

    this.sub = this.activatedRoute.params.subscribe(params => {
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
