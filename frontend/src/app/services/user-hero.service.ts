import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserHero } from '../models/userHero';
import { Hero } from '../models/hero';
import { Observable } from 'rxjs';

/**
 * Service that contains all the routes to our api about the relationship of users and heroes
 */
@Injectable({
  providedIn: 'root'
})
export class UserHeroService {
  /**
   * Variable in which we store the url of our api
   */
  private baseUrl: string = environment.BASE_API_URL;

  /**
    * Constructor in which we inject httpClient to make http requests
    */
  constructor(private http: HttpClient) { }

  /**
   * Follow a hero
   * @param {any} ids
   */
  public followHero(ids) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/followHero`, ids, { headers: headers });
  }

  /**
   * Unfollow a hero
   * @param {any} ids
   */
  public unfollowHero(ids) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/unfollowHero`, ids, { headers: headers });
  }

  /**
   * Favorite a hero
   * @param {any} ids
   */
  public favorite(ids) {
    let params = JSON.stringify(ids);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/favorite`, params, { headers: headers });
  }

  /**
   * Unfavorite a hero
   * @param {any} ids
   */
  public unfavorite(ids) {
    let params = JSON.stringify(ids);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/unfavorite`, params, { headers: headers });
  }


  /**
    * vote a hero
    * @param {any} data
    */
  public voteHero(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/voteHero`, data, { headers: headers });
  }

  /**
   * Comment a hero
   * @param {any} data
   */
  public commentHero(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/commentHero`, data, { headers: headers });
  }

  /**
    * Delete comment
    * @param {any} ids
    */
  public deleteCHero(ids) {
    let params = JSON.stringify(ids);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/userHero/deleteCHero`, params, { headers: headers });
  }

  /**
  * Get the relationship of the hero and the user
  * @param {number} idUsu
  * @param {number} idHero
  * @returns UserHero
  */
  public getHeroUsu(idUsu: number, idHero: number): Observable<UserHero> {
    return this.http.get<UserHero>(`${this.baseUrl}/userHero/getHeroUsu/${idUsu}/${idHero}`);
  }

  // //  //obtener el comentario de un heroe de un usuario
  // //  router.get('/commentHero/:idUsu/:idHero', UserHeroController.getCommentHero);
  // public getcommentHero(idUsu: number,idHero:number) {
  //   return this.http.get<UserHero>(`${this.baseUrl}/userHero/commentHero/${idUsu}/${idHero}`);
  // }

  /**
  * Get all the favorite heroes
  * @param {number} idUsu
  * @returns hero[]
  */
  public allHerosFav(idUsu: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/userHero/allHerosFav/${idUsu}`);
  }

  /**
 * Get all the follow heroes
 * @param {number} idUsu
 * @returns hero[]
 */
  public allHerosFoll(idUsu: number): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/userHero/allHerosFoll/${idUsu}`);
  }

  /**
  * Get top rated marvel hero
  * @returns hero
  */
  public bestMarverHero(): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/userHero/bestMarverHero`);
  }

  /**
   * Get top rated DC hero
   * @returns hero
   */
  public bestDCHero(): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseUrl}/userHero/bestDCHero`);
  }

  /**
    * Get the most followed heroes
    * @returns hero[]
    */
  public mostFollowHeros(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/userHero/mostFollowHeros`);
  }


  /**
    * Get all the comments of a hero
    * @param {number} id
    * @returns any
    */
  public getHeroComments(id: number) : Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/userHero/getHeroComments/${id}`);
  }


  /**
   * Get the mean of a hero's scores
   * @param {number} id
   * @returns any
   */
  public getHeroRateScore(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/userHero/getHeroRateScore/${id}`);
  }

  //  public modifyCHero( data) {
  //   // para convertir el objeto en un string
  //   // let params = JSON.stringify(data);
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.put(`${this.baseUrl}/userHero/modifyCHero`, data, { headers: headers });
  // }
}
