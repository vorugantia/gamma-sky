import { Component } from '@angular/core';

@Component({
  selector: 'app-cat-view',
  template: `
    <app-switch-view selectedView="cat"></app-switch-view>
    <app-cat-search></app-cat-search>
    <router-outlet></router-outlet>
  `
})
export class CatViewComponent {
}
