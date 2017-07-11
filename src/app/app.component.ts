import { Component } from '@angular/core';

import { MapViewComponent } from './views/map-view/map-view.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gamma-sky.net'; //This is used for our e2e testing.
}
