import { NgModule } from '@angular/core';

import { CatViewComponent } from './cat-view.component';
import { CatSearchComponent } from '../../widgets/cat-search/cat-search.component';
import { CatHelpComponent } from '../../widgets/cat-help/cat-help.component';
import { CatSource3FGLComponent } from '../../widgets/cat-source/cat-source-3fgl/cat-source-3fgl.component';
import { CatSourceTeVComponent } from '../../widgets/cat-source/cat-source-tev/cat-source-tev.component';
import { CatSource3FHLComponent } from '../../widgets/cat-source/cat-source-3fhl/cat-source-3fhl.component';

import { ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { SelectModule } from 'ng2-select-compat';

import { CatViewRoutingModule } from './cat-view-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CatalogService } from '../../services/catalog.service';


@NgModule({
  declarations: [
    CatViewComponent,
    CatSearchComponent,
    CatHelpComponent,
    CatSource3FGLComponent,
    CatSource3FHLComponent,
    CatSourceTeVComponent
  ],
  imports: [
    CatViewRoutingModule,
    SharedModule,

    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    SelectModule
  ],
  providers: [
    CatalogService
  ]
})
export class CatViewModule { }
