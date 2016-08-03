import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cat-help',
  templateUrl: 'cat-help.component.html',
  styleUrls: ['cat-help.component.css']
})
export class CatHelpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Routing to CatHelpComponent...");
  }

}
