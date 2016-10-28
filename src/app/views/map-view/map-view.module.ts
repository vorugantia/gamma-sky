import { NgModule } from '@angular/core';

import { MapViewComponent } from './map-view.component';
import { MapComponent } from '../../widgets/map/map.component';

import { MapViewRoutingModule } from './map-view-routing.module';

@NgModule({
  declarations: [
    MapViewComponent,
    MapComponent
  ],
  imports: [
    MapViewRoutingModule
  ],
  providers: []
})
export class MapViewModule { }
