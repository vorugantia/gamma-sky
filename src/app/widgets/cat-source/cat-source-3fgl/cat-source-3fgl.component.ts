import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FGL } from '../../../services/catalog';
import { Source3FGL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'app-cat-source-3fgl',
  templateUrl: './cat-source-3fgl.component.html',
  providers: [CatalogService]
})
export class CatSource3FGLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private d;

  private catalog: Catalog3FGL;
  private source: Source3FGL;

  getCatalog() {
    this.catalogService.getCatalog3FGL()
      .subscribe(catalog => this.catalog = catalog);
  }

  getSource() {
    this.catalogService.getSource3FGL(this.id)
      .subscribe(source => {
        this.source = source;
        this.d = source.data;
      });
  }

  peakMeasured() {
    return (this.d.Signif_Peak != null);
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

