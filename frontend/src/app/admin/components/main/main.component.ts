import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
/**
 * Component  to contain other components
 */
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
