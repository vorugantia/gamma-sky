import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FGL } from '../../../services/catalog';
import { CatalogService } from '../../../services/catalog.service';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'cat-source-3fgl',
  templateUrl: './cat-source-3fgl.component.html',
  styleUrls: ['./cat-source-3fgl.component.css']
})
export class CatSource3FGLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private source;

  private catalog: Catalog3FGL;
  private error: any;

  getCatalog() {
    this.catalogService.getCatalog3FGL()
      .then(catalog => {
        this.catalog = catalog;
      })
      .catch(error => this.error = error);
  }

  getSource() {
    return this.catalog.getSourceByID(this.id);
  }

  getUrl(sourceName, image) {

    var imageType = image;

    var name = sourceName.toString();
    name = name.substring(6);
    if(name.indexOf(" ") > 0) {
      name = name.substring(0, name.length-1);
    }

    var string1 = name.substring(0, 4);
    var string2 = name.substring(5, 6);
    var operation = name.substring(6, 7);
    var string3 = name.substring(7);

    var operationLetter;
    if(operation == "+") {
      operationLetter = "p";
    }
    else {
      operationLetter = "m";
    }

    var urlEnd = string1 + "d" + string2 + operationLetter + string3;

    var url = "http://fermi.gsfc.nasa.gov/ssc/data/access/lat/4yr_catalog/3FGL-table/data/3FGL_" + imageType + "_v5/3FGL_J" + urlEnd + "_" + imageType + ".png";
    // console.log("fermi 3fgl url: ", url);
    return url;

  }


  constructor(
    private catalogService: CatalogService,
    public stateService: StateService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource3FGLComponent...");

    this.getCatalog();

    this.sub = this.activatedRoute.params.subscribe(params => {
        let id = +params['id'];
        console.log('id ', id);
        this.id = id;

        // this.stateService.setSelectedId(id);
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
