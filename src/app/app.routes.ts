import { provideRouter, RouterConfig } from '@angular/router';
import { MapViewComponent } from './views/map-view/map-view.component';
import { CatViewComponent } from './views/cat-view/cat-view.component';
import { CatHelpComponent } from './widgets/cat-help/cat-help.component';
import { CatSource2FHLComponent } from './widgets/cat-source/cat-source-2fhl/cat-source-2fhl.component';
import { CatSource3FGLComponent } from './widgets/cat-source/cat-source-3fgl/cat-source-3fgl.component';
import { CatSourceSNRcatComponent } from './widgets/cat-source/cat-source-snrcat/cat-source-snrcat.component';

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
        // path: '2fhl',
        path: '2fhl/:id',
        component: CatSource2FHLComponent
      },
      {
        path: '3fgl/:id',
        component: CatSource3FGLComponent
      },
      {
        path: 'snrcat',
        // path: 'snrcat/:id',
        component: CatSourceSNRcatComponent
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
