import { Injectable } from '@angular/core';

/**
 * Globals variables
 */
@Injectable({
  providedIn: 'root'
})

export class GlobalVariableService {

  /**
   * To keep track of team members
   */
  public countTeamMembers: number = 0;
  /**
  * add in the position where there is a null team member
  */
  public memberTeamNUll: string = "";
  /**
   * Constructor
   */
  constructor() { }
}
