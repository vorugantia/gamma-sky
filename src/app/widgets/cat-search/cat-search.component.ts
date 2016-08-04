import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'cat-search',
  templateUrl: 'cat-search.component.html',
  styleUrls: ['cat-search.component.css']
})
export class CatSearchComponent implements OnInit {

  private selectedCat;

  onSelectChange(value) {
    this.router.navigate(['/cat', value]);
    this.selectedCat = value;
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
