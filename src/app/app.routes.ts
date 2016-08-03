import { provideRouter, RouterConfig } from '@angular/router';
import { MapViewComponent } from './map-view/map-view.component';
import { CatViewComponent } from './cat-view/cat-view.component';
import { CatHelpComponent } from './cat-view/cat-help/cat-help.component';

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
