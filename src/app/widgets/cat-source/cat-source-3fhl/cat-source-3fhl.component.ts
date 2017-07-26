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

  //TODO this code has been repeated for the three cats. Can it be added to catalog.service.ts?
  goToMap() {
    let formattedGlon = this.source.format(this.d.GLON, false).toString();
    let formattedGlat = this.source.format(this.d.GLAT, false).toString();
    let target = formattedGlon + formattedGlat;
    // this.source.format() keeps a hanging space at the end of each value:
    target = target.slice(0, -1);

    this.router.navigate(
      ['map'], {
        queryParams: {
          target: target
        }
      });
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    console.log("Routing to CatSource3FHLComponent...");

    // TODO params will be replaced by paramMap. (https://angular.io/guide/router#parammap-api) - I made this switch already in MapComponent.
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
