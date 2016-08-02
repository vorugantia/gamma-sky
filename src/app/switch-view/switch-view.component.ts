import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'switch-view',
  templateUrl: 'switch-view.component.html',
  styleUrls: ['switch-view.component.css']
})
export class SwitchViewComponent implements OnInit, DoCheck {

  @Input() notCurrentView;

  private toggle: boolean = false;

  onClick() {
    // this.toggle = !this.toggle;
    this.router.navigate([this.notCurrentView]);
  }

  constructor(private router: Router) { }

  ngOnInit() {

  }

  ngDoCheck() {
    // if (this.toggle == false) {
    //   $("#switchViewButton").html("Go to {{currentView}}");
    // } else {
    //   $("#switchViewButton").html("Go to {{currentView}}");
    // }

  }

}
