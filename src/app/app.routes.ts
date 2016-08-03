import { provideRouter, RouterConfig } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';
import { CatHelpComponent } from './cat-view/cat-help/cat-help.component';
import { CatSource2FHLComponent } from './cat-view/cat-source/cat-source-2fhl/cat-source-2fhl.component';

const routes: RouterConfig = [

  {
    path: 'map',
    component: MapViewComponent
  },
  {
    path: 'cat',
    component: CatViewComponent,
    children: [
      {
        path: '2fhl',
        component: CatSource2FHLComponent
      },
      {
        path: '',
        component: CatHelpComponent
      }
    ]
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
