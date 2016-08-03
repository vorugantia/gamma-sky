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

  @Input() selectedView;

  private buttonDisplay: string;

  // private toggle: boolean = false;

  changeButtonDisplay() {
    if(this.selectedView == "map") {
      this.buttonDisplay = "cat";
    }
    else if(this.selectedView == "cat") {
      this.buttonDisplay = "map";
    }
    else {
      console.log("Error on buttonDisplay in SwitchViewComponent");
    }
  }

  onClick() {
    this.changeButtonDisplay();
    this.router.navigate([this.buttonDisplay])
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.changeButtonDisplay();
  }

}
