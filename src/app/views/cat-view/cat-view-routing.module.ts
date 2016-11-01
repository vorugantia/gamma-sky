import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatViewComponent } from './cat-view.component';
import { CatHelpComponent } from '../../widgets/cat-help/cat-help.component';
import { CatSource3FGLComponent } from '../../widgets/cat-source/cat-source-3fgl/cat-source-3fgl.component';
import { CatSource2FHLComponent } from '../../widgets/cat-source/cat-source-2fhl/cat-source-2fhl.component';
import { CatSourceSNRcatComponent } from '../../widgets/cat-source/cat-source-snrcat/cat-source-snrcat.component';
import { CatSourceTeVComponent } from '../../widgets/cat-source/cat-source-tev/cat-source-tev.component';

const routes: Routes = [
  // { path: '', redirectTo: 'test', pathMatch: 'full'},
  {
    path: '',
    component: CatViewComponent,
    children: [
      {
        path: '',
        component: CatHelpComponent
      },
      {
        path: '3fgl/:id',
        component: CatSource3FGLComponent
      },
      {
        path: '2fhl/:id',
        component: CatSource2FHLComponent
      },
      {
        path: 'snrcat/:id',
        component: CatSourceSNRcatComponent
      },
      {
        path: 'tev/:id',
        component: CatSourceTeVComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatViewRoutingModule {}
