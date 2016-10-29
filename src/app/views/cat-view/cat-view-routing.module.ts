import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatViewComponent } from './cat-view.component';
import { CatHelpComponent } from '../../widgets/cat-help/cat-help.component';

const routes: Routes = [
  // { path: '', redirectTo: 'test', pathMatch: 'full'},
  {
    path: '',
    component: CatViewComponent,
    children: [
      {
        path: '',
        component: CatHelpComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatViewRoutingModule {}
