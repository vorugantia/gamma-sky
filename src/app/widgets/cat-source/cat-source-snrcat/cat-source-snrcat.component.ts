import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CatalogSNRcat } from '../../../services/catalog';
import { SourceSNRcat } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-snrcat',
  templateUrl: './cat-source-snrcat.component.html',
  styleUrls: ['./cat-source-snrcat.component.css']
})
export class CatSourceSNRcatComponent implements OnInit {

  private sub;
  private id;

  private catalog: CatalogSNRcat;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalogSNRcat()
      .then(catalog => {
        this.catalog = catalog;
        console.log(catalog);

      })
      .catch(error => this.error = error);
  }

  getSource() {
    return this.catalog.getSource(this.id);
  }

  getSNRcatUrl(source) {
    return new SourceSNRcat(this.catalog).getSNRcatUrl(source.data.snrcat_id);
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSourceSNRcatComponent...");


    this.sub = this.activatedRoute.params.subscribe(params => {
      let id = +params['id'];
      console.log('id ', id);
      this.id = id;
    });

    this.getCatalog();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
