import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapViewComponent } from './map-view.component';

const routes: Routes = [
  // { path: '',    component: MapViewComponent }

  {
    path: '',
    component: MapViewComponent,
    children: [
      {
        path: '?target=:target&fov=:fov&marker=:marker',
        component: MapViewComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapViewRoutingModule {}
