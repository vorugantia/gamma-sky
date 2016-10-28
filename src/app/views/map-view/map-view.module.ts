import { NgModule } from '@angular/core';

import { MapViewComponent } from './map-view.component';

import { MapViewRoutingModule } from './map-view-routing.module';

@NgModule({
  declarations: [
    MapViewComponent
  ],
  imports: [
    MapViewRoutingModule
  ],
  providers: []
})
export class MapViewModule { }
