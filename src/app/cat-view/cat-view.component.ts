import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cat-view',
  templateUrl: 'cat-view.component.html',
  styleUrls: ['cat-view.component.css']
})
export class CatViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('CatViewComponent ngOnInit()');
  }

}
