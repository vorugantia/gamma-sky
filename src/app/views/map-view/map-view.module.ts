import { NgModule } from '@angular/core';

import { MapViewComponent } from './map-view.component';
import { MapComponent } from '../../widgets/map/map.component';
import { AboutButtonComponent, AboutDialogComponent } from '../../widgets/about/about.component';
import { ShareButtonComponent, ShareDialogComponent } from '../../widgets/share/share.component';

import { MapViewRoutingModule } from './map-view-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { CatalogService } from '../../services/catalog.service';
import { AppInfoService} from '../../services/app-info.service';

@NgModule({
  declarations: [
    MapViewComponent,
    MapComponent,
    AboutButtonComponent,
    AboutDialogComponent,
    ShareButtonComponent,
    ShareDialogComponent
  ],
  imports: [
    MapViewRoutingModule,
    SharedModule
  ],
  providers: [
    CatalogService,
    AppInfoService
  ],
  entryComponents: [
    AboutDialogComponent,
    ShareDialogComponent
  ]
})
export class MapViewModule {
}
