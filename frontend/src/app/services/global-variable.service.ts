import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalVariableService {

  public countTeamMembers:number=0;
  public memberTeamNUll:string = "";
  constructor() { }
}
