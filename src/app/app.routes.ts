import { provideRouter, RouterConfig } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';

const routes: RouterConfig = [

  {
    path: 'map',
    component: MapViewComponent
  },
  {
    path: 'cat',
    component: CatViewComponent
  },
  {
    path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  }

];

export const appRouterProviders = [
  provideRouter(routes)
]
