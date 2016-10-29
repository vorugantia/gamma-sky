import { NgModule } from '@angular/core';

import { CatViewComponent } from './cat-view.component';

import { CatViewRoutingModule } from './cat-view-routing.module';

import { CatalogService } from '../../services/catalog.service';
import { StateService } from '../../services/state.service';

@NgModule({
  declarations: [
    CatViewComponent
  ],
  imports: [
    CatViewRoutingModule
  ],
  providers: [
    CatalogService,
    StateService
  ]
})
export class CatViewModule { }
