import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogTeV } from '../../../services/catalog';
import { SourceTeV } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-tev',
  templateUrl: './cat-source-tev.component.html',
  styleUrls: ['./cat-source-tev.component.css'],
  providers: [CatalogService]
})
export class CatSourceTeVComponent implements OnInit {

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

  show_spec_pl() {
    if(this.d.spec_type == 'pl')
      return true;
    return false;
  }
  show_spec_pl2() {
    if(this.d.spec_type == 'pl2')
      return true;
    return false;
  }
  show_spec_ecpl() {
    if(this.d.spec_type == 'ecpl')
      return true;
    return false;
  }
  no_spec() {
    if(this.d.spec_type == 'none')
      return true;
    return false;
  }

  goToMap() {
    let formattedGlon = this.source.format(this.d.glon, false).toString();
    let formattedGlat = this.source.format(this.d.glat, false).toString();
    let target = formattedGlon + formattedGlat;
    // this.source.format() keeps a hanging space at the end of each value:
    target = target.slice(0, -1);
    console.log(target);


    this.router.navigate(
      ['map'], {
        queryParams: {
          target: target
        }
      });
    // this.router.navigate(['map']);
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("Routing to CatSourceTeVComponent...");

    this.sub = this.activatedRoute.params.subscribe(params => {
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
