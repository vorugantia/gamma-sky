import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'cat-search',
  templateUrl: 'cat-search.component.html',
  styleUrls: ['cat-search.component.css']
})
export class CatSearchComponent implements OnInit {

  onClick() {
    this.router.navigate(['/cat/2fhl']);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
