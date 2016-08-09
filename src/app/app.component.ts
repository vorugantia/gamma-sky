import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
// import { MapViewComponent } from './map-view/map-view.component';
// import { CatViewComponent } from './cat-view/cat-view.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  // styleUrls: ['app.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AppComponent {
  title = 'This is AppComponent';
}
