import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Team } from '../models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  //variable almacenamos la url de nuestra api node
  private baseUrl: string = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  // create a team
  public createTeam(team) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/team/createTeam`, team,
      { headers: headers });
  }

  // check the numbers of menbers
  public checkTeam(idTeam: number) {
    return this.http.get(`${this.baseUrl}/team/checkTeam/${idTeam}`);
  }

  // obtener equipo por su id
  public getTeam(idTeam: number) {
    return this.http.get<Team>(`${this.baseUrl}/team/getTeam/${idTeam}`);
  }

  // obtener equipo con mayor stats
  public bestTeam() {
    return this.http.get<Team>(`${this.baseUrl}/team/bestTeam`);
  }

  //change name

  public changeName(idTeam: number, team) {
    // para convertir el objeto en un string
    let params = JSON.stringify(team);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/team/chageName/${idTeam}`, params, { headers: headers });
  }

  // //añadir nuevo miembro (hay que mandarle el campo de la bd "member_1, member_2, etc" y el codigo del hero)
  public addMember(idTeam: number, team) {
    // para convertir el objeto en un string
    let params = JSON.stringify(team);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/team/addMember/${idTeam}`, params, { headers: headers });
  }

  //delete member
  public deleteMember(idTeam: number, team) {
    // para convertir el objeto en un string
    let params = JSON.stringify(team);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/team/deleteMember/${idTeam}`, params, { headers: headers });
  }

  // borrar un equipo
  public delete(idTeam: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.baseUrl}/team/${idTeam}`, { headers: headers });
  }



}
