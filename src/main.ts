import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { appRouterProviders } from './app/app.routes';
import { HTTP_PROVIDERS } from '@angular/http';
// import { CatalogService } from './app/services/catalog.service';

// import 'ng2-bootstrap/ng2-bootstrap.js';
// import 'ng2-select/ng2-select.js';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent, [
  appRouterProviders,
  HTTP_PROVIDERS,
  // CatalogService
]);
