import { Component, OnInit } from '@angular/core';
// import $ from "jquery";
// or
// import $ = require("jquery");
/**
 * Component to contain other fight component
 */
@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.scss']
})

export class FightComponent implements OnInit {

  /**
   * Constructor in which we inject our services and different elements
   */
  constructor(
  ) { }

  /**
   * Start when the component inits
   */
  ngOnInit() {


  }
}