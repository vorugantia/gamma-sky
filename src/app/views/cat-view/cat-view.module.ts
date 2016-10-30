import { NgModule } from '@angular/core';

import { CatViewComponent } from './cat-view.component';
import { CatSearchComponent } from '../../widgets/cat-search/cat-search.component';
import { CatHelpComponent } from '../../widgets/cat-help/cat-help.component';
import { CatSource3FGLComponent } from '../../widgets/cat-source/cat-source-3fgl/cat-source-3fgl.component';
import { CatSource2FHLComponent } from '../../widgets/cat-source/cat-source-2fhl/cat-source-2fhl.component';
import { CatSourceSNRcatComponent } from '../../widgets/cat-source/cat-source-snrcat/cat-source-snrcat.component';
import { CatSourceTeVComponent } from '../../widgets/cat-source/cat-source-tev/cat-source-tev.component';

import { CatViewRoutingModule } from './cat-view-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CatalogService } from '../../services/catalog.service';
import { StateService } from '../../services/state.service';

@NgModule({
  declarations: [
    CatViewComponent,
    CatSearchComponent,
    CatHelpComponent,
    CatSource3FGLComponent,
    CatSource2FHLComponent,
    CatSourceSNRcatComponent,
    CatSourceTeVComponent
  ],
  imports: [
    CatViewRoutingModule,
    SharedModule
  ],
  providers: [
    CatalogService,
    StateService
  ]
})
export class CatViewModule { }
