import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'cat-source-snrcat',
  templateUrl: 'cat-source-snrcat.component.html',
  styleUrls: ['cat-source-snrcat.component.css']
})
export class CatSourceSNRcatComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Routing to CatSourceSNRcatComponent...");
  }

}
