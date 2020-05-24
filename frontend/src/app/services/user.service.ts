import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';
import { Observable } from 'rxjs';

/**
 * Service that contains all the routes to our api regarding users
 */
@Injectable({
  providedIn: "root",
})


export class UserService {
  /**
  * Variable in which we store the url of our api
  */
  private baseUrl: string = environment.BASE_API_URL;
  /**
  * Variable in which we store the token info about the user
  */
  public identity;
  /**
  * Variable in which we store the token 
  */
  public token;

  /**
   * Constructor in which we inject httpClient to make http requests
   */
  constructor(private http: HttpClient) { }

  /**
  * Register User
  * @param {User} user
  */
  public RegisterUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/auth/signup', user,
      { headers: headers });
  }

  /**
   * Login User
   * @param {User} user
   */
  public LoginUser(user) {
    // if toker equals null user takes the token property
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/auth/signin', user,
      { headers: headers });
  }

  /**
   * Get user from localstorage
   * @returns identity
   */
  public getIdentity() {
    let identity = JSON.parse(localStorage.getItem('User'));
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  /**
 * Get token from localstorage
 * @returns token
 */
  public getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  /**
  * translate the token to catch the expiration date
  * @returns token expiration date
  */
  public getTokenInfo() {
    let token = (localStorage.getItem('token'));
    let payload;
    if (token) {
      // we cut the token from the point that interests us
      payload = token.split('.')[1];
      // we use window.atob which decodes a data string that has been encoded using base-64 encoding
      payload = window.atob(payload);
      // console.log(payload.split(`"exp":`)[1])
      return JSON.parse(payload);
      //  JSON.parse(payload);
      //  payload.split(`"exp":`)[1];
      //  payload.split("}")[0];
      //  console.log(payload)
      // console.log(payload.split(`"exp":`)[1])
    } else {
      return null;
    }
  }

  /**
  * Check token expiration time
  * @returns {boolean}
  */
  public isLoggedIn(): boolean {
    const user = this.getTokenInfo();
    if (user) {
      // return user.exp > (Date.now() / 1000) + (60 * 60);  // Token de una hora de duración
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  /**
   * Get user 
   * @param {number} idUsu
   * @returns {User} user
   */
  public getUser(idUsu: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/${idUsu}`);
  }

  /**
  * Update a user 
  * @param {number} idUsu
  * @param {User} user
  */
  public updateUser(idUsu: number, user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // we add the token to the header
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/user/${idUsu}`, user, { headers: headers });
  }

  /**
  * Update a user password
  * @param {number} idUsu
  * @param {any} data
  */
  public updatePass(idUsu: number, data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/user/newpass/${idUsu}`, data, { headers: headers });
  }

  /**
  * Delete a user
  * @param {number} idUsu
  * @param {any} data
  */
  public deleteUser(idUsu: number, data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.post(`${this.baseUrl}/user/deleteUser/${idUsu}`, data,
      { headers: headers });
  }

  /**
   * Follow a user
   * @param {any} ides
   */
  public followUser(ides) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.post(`${this.baseUrl}/user/followUser`, ides,
      { headers: headers });
  }

  /**
  * Unfollow a user
  * @param {any} ides
  */
  public unFollowUser(idUsu: number, idUnfollow: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.delete(`${this.baseUrl}/user/unFollowUser/${idUsu}/${idUnfollow}`, { headers: headers });
  }

  /**
 * Get users by alias
 * @param {string} alias
 * @returns user[]
 */
  public getUserByName(alias: string) : Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/user/getUserByName/${alias}`);
  }

  /**
  * Check whether a user is being followed
  * @param {number} idUsu
  * @param {number} idUnfollow
  * @returns any
  */
  public checkFollow(idUsu: number, idUnfollow: number) {
    return this.http.get<any>(`${this.baseUrl}/user/checkFollow/${idUsu}/${idUnfollow}`);
  }

  /**
    * Get all the users you follow
    * @param {number} idUsu
    * @returns User[]
    */
  public getFollowUsers(idUsu: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/getFollowUsers/${idUsu}`);
  }

  /**
  * Get all the users who follow you
  * @param {number} idUsu
  * @returns User[]
  */
  public getFollowersUsers(idUsu: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/user/getFollowersUsers/${idUsu}`);
  }

  /**
  * Update profile picture
  * @param {any} data
  */
  public newImg(data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.put(`${this.baseUrl}/user/newImg/user`, data, { headers: headers });
  }

  /**
* Get all the users 
* @returns User[]
*/
  public allusers(): Observable<User[]> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.get<User[]>(`${this.baseUrl}/admin/allusers`, { headers: headers });
  }


  /**
    * Delete a user 
    * @param {number} idUsu
    */
  public adminDeleteUser(idUsu: number) {
    console.log(idUsu)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    let tokenAuth = (localStorage.getItem('token'));
    headers = headers.set("Authorization", `${tokenAuth}`);
    return this.http.delete(`${this.baseUrl}/admin/${idUsu}`,
      { headers: headers });
  }

}
