import { NgModule } from '@angular/core';

import { CatViewComponent } from './cat-view.component';
import { CatSearchComponent } from '../../widgets/cat-search/cat-search.component';

import { CatViewRoutingModule } from './cat-view-routing.module';

import { CatalogService } from '../../services/catalog.service';
import { StateService } from '../../services/state.service';

@NgModule({
  declarations: [
    CatViewComponent,
    CatSearchComponent
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
