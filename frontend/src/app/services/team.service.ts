import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Team } from '../models/team';
import { Observable } from 'rxjs';

/**
 * Service that contains all the routes to our api regarding Teams
 */
@Injectable({
  providedIn: 'root'
})

export class TeamService {
  /**
  * Variable in which we store the url of our api
  */
  private baseUrl: string = environment.BASE_API_URL;

  /**
  * Constructor in which we inject httpClient to make http requests
  */
  constructor(private http: HttpClient) { }

  /**
   * Create a new team
   * @param {Team} team
   */
  public createTeam(team) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/team/createTeam`, team,
      { headers: headers });
  }

  /**
   * Get team with higher stats
   * @returns Team
   */
  public bestTeam(): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/bestTeam`);
  }


  /**
     * Change name
     * @param {number} idTeam
     * @param {Team} team
     */
  public changeName(idTeam: number, team) {
    let params = JSON.stringify(team);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/team/chageName/${idTeam}`, params, { headers: headers });
  }

  /**
   * Add new member (you must send the field of the bd "member_1, member_2, etc" and the hero code)
   * @param {number} idTeam
   * @param {any} data
   */
  public addMember(idTeam: number, data) {
    console.log(data)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/team/addMember/${idTeam}`, data, { headers: headers });
  }

  /**
    * Delete member
    * @param {number} idTeam
    * @param {string} member
    */
  public deleteMember(idTeam: number, member) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/team/deleteMember/${idTeam}`, member, { headers: headers });
  }

  /**
     * Delete Team
     * @param {number} idTeam
     */
  public delete(idTeam: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.delete(`${this.baseUrl}/team/${idTeam}`, { headers: headers });
  }


  /**
  * Get user Team
  * @param {number} idUsu
  * @returns team
  */
  public getTeamInfo(idUsu: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/getTeamInfo/${idUsu}`);
  }

  /**
  * Get the team with the highest points
  * @param {number} idteam1
  * @param {number} idteam2
  * @returns team
  */
  public getteamWinner(idteam1: number, idTeam2: number): Observable<Team> {
    return this.http.get<Team>(`${this.baseUrl}/team/getTeamWinner/${idteam1}/${idTeam2}`);
  }

  /**
   * Get the team by name
   * @param {string} teamName
   * @returns team[]
   */
  public searchTeam(teamName: string): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/team/searchTeam/${teamName}`);
  }

}
