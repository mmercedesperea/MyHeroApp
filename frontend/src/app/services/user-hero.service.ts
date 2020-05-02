import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserHero } from '../models/userHero';

@Injectable({
  providedIn: 'root'
})
export class UserHeroService {
  //variable almacenamos la url de nuestra api node
  private baseUrl: string = environment.BASE_API_URL;


  constructor(private http: HttpClient) { }


//  // Follow a hero(idUsu,idHero)
//  router.put('/followHero', UserHeroController.followHero);
public followHero( ids) {
  // para convertir el objeto en un string
  // let params = JSON.stringify(ids);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/followHero`, ids, { headers: headers });
}

//  // Unfollow a hero(idUsu,idHero)
//  router.put('/unfollowHero', UserHeroController.unfollowHero);
public unfollowHero( ids) {
  // para convertir el objeto en un string
  // let params = JSON.stringify(ids);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/unfollowHero`, ids, { headers: headers });
}
//  // favorite a hero(idUsu,idHero)
//  router.put('/favorite', UserHeroController.favorite);
public favorite( ids) {
  // para convertir el objeto en un string
  let params = JSON.stringify(ids);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/favorite`, params, { headers: headers });
}
//  // unfavorite a hero(idUsu,idHero)
//  router.put('/unfavorite', UserHeroController.unfavorite);
public unfavorite( ids) {
  // para convertir el objeto en un string
  let params = JSON.stringify(ids);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/unfavorite`, params, { headers: headers });
}
//  // vote (score,idUsu,idHero)
public voteHero( data) {
  // para convertir el objeto en un string
  let params = JSON.stringify(data);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/voteHero`, params, { headers: headers });
}

//  // comment(comment,idUsu,idHero)
//  router.put('/commentHero', UserHeroController.commentHero);
public commentHero( data) {
  // para convertir el objeto en un string
  let params = JSON.stringify(data);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/commentHero`, params, { headers: headers });
}

//  // delete comment  (idUsu,idHero)
//  router.put('/deleteCHero', UserHeroController.deleteCHero);
public deleteCHero( ids) {
  // para convertir el objeto en un string
  let params = JSON.stringify(ids);
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this.http.put(`${this.baseUrl}/userHero/deleteCHero`, params, { headers: headers });
}

//  //obtener el voto de un heroe de un usuario
//  router.get('/voteHero/:idUsu/:idHero', UserHeroController.getVoteHero);
public getVoteHero(idUsu: number,idHero:number) {
  return this.http.get(`${this.baseUrl}/userHero/voteHero/${idUsu}/${idHero}`);
}

//  //obtener el comentario de un heroe de un usuario
//  router.get('/commentHero/:idUsu/:idHero', UserHeroController.getCommentHero);
public getcommentHero(idUsu: number,idHero:number) {
  return this.http.get(`${this.baseUrl}/userHero/commentHero/${idUsu}/${idHero}`);
}

//  // obtener todos los heroes favoritos
//  router.get('/allHerosFav/:idUsu', UserHeroController.allHerosFav);
public allHerosFav(idUsu: number) {
  return this.http.get<any>(`${this.baseUrl}/userHero/allHerosFav/${idUsu}`);
}

//  //obtener todos los heroes follow
//  router.get('/allHerosFoll/:idUsu', UserHeroController.allHerosFoll);
public allHerosFoll(idUsu: number) {
  return this.http.get<any>(`${this.baseUrl}/userHero/allHerosFoll/${idUsu}`);
}
//   //obtener hero de marvel mas votado
//   router.get('/bestMarverHero', UserHeroController.bestMarverHero);
public bestMarverHero() {
  return this.http.get(`${this.baseUrl}/userHero/bestMarverHero`);
}
//   //obtener hero de Dc mas votado
//   router.get('/bestDCHero', UserHeroController.bestDCHero);
public bestDCHero() {
  return this.http.get(`${this.baseUrl}/userHero/bestDCHero`);
}
//   // obtener los heroes más seguidos
//  router.get('/mostFollowHeros', UserHeroController.mostFollowHeros);
public mostFollowHeros() {
  return this.http.get<any>(`${this.baseUrl}/userHero/mostFollowHeros`);
}
}
