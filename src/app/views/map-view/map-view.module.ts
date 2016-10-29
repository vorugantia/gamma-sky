import { NgModule } from '@angular/core';

import { MapViewComponent } from './map-view.component';
import { MapComponent } from '../../widgets/map/map.component';

import { MapViewRoutingModule } from './map-view-routing.module';

import { CatalogService } from '../../services/catalog.service';

@NgModule({
  declarations: [
    MapViewComponent,
    MapComponent
  ],
  imports: [
    MapViewRoutingModule
  ],
  providers: [
    CatalogService
  ]
})
export class MapViewModule { }
