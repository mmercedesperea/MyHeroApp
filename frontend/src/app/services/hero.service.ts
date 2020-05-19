import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  //variable almacenamos la url de nuestra api node
  private baseUrl: string = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  // routes

  // //obtener un heroe por el nombre
  public getHeroByName(name: string) {
    return this.http.get<Hero[]>(`${this.baseUrl}/apiHero/search/${name}`);
  }

  // //obtener un heroe por el id
  public getHeroById(id: any) {

    return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`);

  }

  // //obtener todos los heroes de marvel
  public allMarvelHeroes() {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/all/MarvelHeroes`);
  }

  //obtener todos los heroes de DC
  public allDCHeroes() {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/all/DCHeroes`);
  }

  // obtener el heroe con mayor puntos 
  public getWinner(idHero: number, idHero2: number) {
    return this.http.get<any>(`${this.baseUrl}/hero/getWinner/${idHero}/${idHero2}`);
  }

  public mostIntelligence() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostIntelligence`);
  }

  public mostStrength() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostStrength`);
  }

  public mostSpeed() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostSpeed`);
  }

  public mostDurability() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostDurability`);
  }

  public mostPower() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostPower`);
  }

  public mostCombat() {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostCombat`);
  }
  // //obtener ultimos heroes añadidos
  public newHeros() {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/new/heros`);
  }

  //obtener imagenes de heroes para perfil
  // router.get('/profileImgHeroes', HeroController.profileImgHeroes);
  public profileImgHeroes() {
    return this.http.get<any[]>(`${this.baseUrl}/hero/img/profileImgHeroes`);
  }

  // Create new hero
  public newHero(hero) {
    console.log("llego al servicio")
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.post(this.baseUrl + '/admin/newHero', hero,
      { headers: headers });
  }

  //modify hero
  public modifyHero(idHero: number, data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/admin/modifyHero/${idHero}`, data, { headers: headers });
  }


}


