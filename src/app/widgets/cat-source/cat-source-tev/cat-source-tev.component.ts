import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogTeV } from '../../../services/catalog';
import { SourceTeV } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-tev',
  templateUrl: './cat-source-tev.component.html',
  styleUrls: ['./cat-source-tev.component.css']
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
      .then(catalog => { this.catalog = catalog; })
      .catch(error => this.error = error);
  }

  getSource() {
    this.catalogService.getSourceTeV(this.id)
      .then(source => {
        this.source = source;
        this.d = source.data;
      })
      .catch (error => this.error = error);
  }

  show_spec_pl() {
    if(this.source.data.spec_type == 'pl')
      return true;
    return false;
  }
  show_spec_pl2() {
    if(this.source.data.spec_type == 'pl2')
      return true;
    return false;
  }
  show_spec_ecpl() {
    if(this.source.data.spec_type == 'ecpl')
      return true;
    return false;
  }
  no_spec() {
    if(this.source.data.spec_type == 'none')
      return true;
    return false;
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
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
