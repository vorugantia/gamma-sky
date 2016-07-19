import {Component, DoCheck} from '@angular/core';
declare var $: any;

@Component({
  moduleId: module.id,
  selector: "about-button",
  templateUrl: "about-button.component.html",
  styleUrls: ["about-button.component.css"],
})

export class AboutButtonComponent implements DoCheck {

  toggle = false;

  onClick() {
    $("#aboutInfo").toggle();
    this.toggle = !this.toggle;
  }

  pageWidth: any;

  resizeAboutMargin(pageWidth) {

    if (pageWidth > 800) {
        document.getElementById("aboutButton").style.right = "100px";
        document.getElementById("aboutInfo").style.right = "100px";
    }
    if (pageWidth <= 800) {
        document.getElementById("aboutButton").style.right = "50px";
        document.getElementById("aboutInfo").style.right = "50px";
    }
    if (pageWidth > 500) {
        document.getElementById("aboutInfo").style.width = "410px";
    }
    if (pageWidth <= 500) {
        document.getElementById("aboutInfo").style.width = "205px";
    }
  }


  ngDoCheck() {

    if (this.toggle == false) {
        $("#aboutButton").html("About");
    } else {
        $("#aboutButton").html("Close");
    }

    this.resizeAboutMargin($(document).width());
    }
}
