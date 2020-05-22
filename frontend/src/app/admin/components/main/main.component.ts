import { Component, OnInit } from '@angular/core'
/**
 * Component  to contain other components
 */
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  /**
   * component title
   */
  title = 'Admin Panel'

  /**
   * Constructor in which we inject our services and diferents elements
   */
  constructor () {}

  /**
   * Start when de component init
   */
  ngOnInit () {}
}
