import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';

/**
 * Service that contains all the routes to our api regarding heroes
 */
@Injectable({
  providedIn: 'root'
})

export class HeroService {
  /**
   * Variable in which we store the url of our api
   */
  private baseUrl: string = environment.BASE_API_URL;

  /**
   * Constructor in which we inject httpClient to make http requests
   */
  constructor(private http: HttpClient) { }

  /**
   * Get a hero by his name
   * @param {string} name
   * @returns Array of heroes
   */
  public getHeroByName(name: string) :Observable<Hero[]> {
    return this.http.get<Hero[]>(
      `${this.baseUrl}/hero/searchHeroByName/${name}`
    );
  }


  /**
   * Get a hero by id
   * @param {any} id
   * @returns Hero
   */
  public getHeroById(id: any): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/getByid/${id}`);
  }

  /**
   * Get all the marvel heroes
   * @returns Array of heroes
   */
  public allMarvelHeroes():  Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/all/MarvelHeroes`);
  }

  /**
   * Get all the DC heroes
   * @returns Array of heroes
   */
  public allDCHeroes():  Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/all/DCHeroes`);
  }

  /**
   * Get the hero with the highest points
   * @param {number} idHero
   * @param {number} idHero2
   * @returns Hero
   */
  public getWinner(idHero: number, idHero2: number) :  Observable<Hero>{
    return this.http.get<Hero>(
      `${this.baseUrl}/hero/getWinner/${idHero}/${idHero2}`
    );
  }

  /**
   * Get the smartest hero
   * @returns Hero
   */
  public mostIntelligence():  Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostIntelligence`);
  }

  /**
   * Get the stronger hero
   * @returns Hero
   */
  public mostStrength():  Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostStrength`);
  }

  /**
   * Get the fastest hero
   * @returns Hero
   */
  public mostSpeed():  Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostSpeed`);
  }

  /**
   * Get more resistant hero
   * @returns Hero
   */
  public mostDurability() :  Observable<Hero>{
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostDurability`);
  }

  /**
   * Get more power hero
   * @returns Hero
   */
  public mostPower() :  Observable<Hero>{
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostPower`);
  }

  /**
   * Get the hero with more combat
   * @returns Hero
   */
  public mostCombat():  Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/hero/stats/mostCombat`);
  }

  // //obtener ultimos heroes añadidos
  public newHeros():  Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/hero/new/heros`);
  }

  // obtener imagenes de heroes para perfil
  // router.get('/profileImgHeroes', HeroController.profileImgHeroes);
  public profileImgHeroes() :  Observable<any[]>{
    return this.http.get<any[]>(`${this.baseUrl}/hero/img/profileImgHeroes`);
  }

  // Create new hero
  public newHero(hero) {
    console.log('llego al servicio');
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tokenAuth = localStorage.getItem('token');
    headers = headers.set('Authorization', `${tokenAuth}`);
    return this.http.post(this.baseUrl + '/admin/newHero', hero, {
      headers
    });
  }

  // modify hero
  public modifyHero(idHero: number, data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const tokenAuth = localStorage.getItem('token');
    headers = headers.set('Authorization', `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/admin/modifyHero/${idHero}`, data, {
      headers
    });
  }
}
