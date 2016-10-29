import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatViewComponent } from './cat-view.component';

const routes: Routes = [
  // { path: '', redirectTo: 'test', pathMatch: 'full'},
  { path: '',    component: CatViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatViewRoutingModule {}
