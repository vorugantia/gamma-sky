import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'switch-view',
  templateUrl: 'switch-view.component.html',
  styleUrls: ['switch-view.component.css']
})
export class SwitchViewComponent implements OnInit {

  @Input() notCurrentView;

  private toggle: boolean = false;
  //
  onClick() {
    this.toggle = !this.toggle;
    this.router.navigate([this.notCurrentView]);
  }

  constructor(private router: Router) { }

  ngOnInit() {

  }

}
