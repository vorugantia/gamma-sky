import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Catalog3FGL } from '../../../services/catalog';
import { Source3FGL } from '../../../services/source';
import { CatalogService } from '../../../services/catalog.service';

@Component({
  selector: 'cat-source-3fgl',
  templateUrl: './cat-source-3fgl.component.html',
  styleUrls: ['./cat-source-3fgl.component.css'],
  providers: [CatalogService]
})
export class CatSource3FGLComponent implements OnInit, OnDestroy {

  private sub;
  private id;
  private d;

  private catalog: Catalog3FGL;
  private source: Source3FGL;
  private error: any;

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
    return url;

  }

  isPowerLaw() {
    if(this.d.SpectrumType.trim() == 'PowerLaw')
      return true;
    return false;
  }
  isLogParabola() {
    if(this.d.SpectrumType.trim() == 'LogParabola')
      return true;
    return false;
  }
  isECPL() {
    if(this.d.SpectrumType.trim() == 'PLExpCutoff')
      return true;
    return false;
  }
  isSuperECPL() {
    if(this.d.SpectrumType.trim() == 'PLSuperExpCutoff')
      return true;
    return false;
  }

  peakMeasured() {
    if(this.d.Signif_Peak != null)
      return true;
    return false;
  }

  goToMap() {
    let target = this.source.getTargetString();
    let fov = 20 // Set default fov to 20 degrees.
    this.router.navigate(['map'], {
      queryParams: {
        target: target,
        fov: fov
      }
    });
  }

  constructor(
    private catalogService: CatalogService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log("Routing to CatSource3FGLComponent...");

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
