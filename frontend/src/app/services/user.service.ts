import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../models/user';

@Injectable({
  providedIn: "root",
})
export class UserService {
  //variable almacenamos la url de nuestra api node
  private baseUrl: string = environment.BASE_API_URL;
  public identity;
  public token;

  // inyectamos en nuestro constructtor nuestro servicio http
  constructor(private http: HttpClient) { }

  // routes

  // Register User
  public RegisterUser(user) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.baseUrl + '/auth/signup', user,
      { headers: headers });
  }

  // login User
  public LoginUser(user) {
    // si toker es igual a null user lleva la propiedad token
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + '/auth/signin', user,
      { headers: headers });
  }

  //obtener usuario del localstorage
  public getIdentity() {
    let identity = JSON.parse(localStorage.getItem('User'));
    if (identity != 'undefined') {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  // obtener token del localstorage
  public getToken() {
    let token = localStorage.getItem('token');
    if (token != 'undefined') {
      this.token = token;
    } else {
      this.token = null;
    }
    return this.token;
  }

  //traducir el token para coger la fecha de expedicion
  public getTokenInfo() {
    let token = (localStorage.getItem('token'));
    let payload;
    if (token) {
      //cortamos el token desde el punto que nos interesa
      payload = token.split('.')[1];
      //  utilizamos window.atob que descodifica una cadena de datos que ha sido codificada utilizando la codificación en base-64
      payload = window.atob(payload);
      // console.log(payload.split(`"exp":`)[1])
      return JSON.parse(payload);
      //  // JSON.parse(payload);
      //  payload.split(`"exp":`)[1];
      //  payload.split("}")[0];
      //  console.log(payload)
      // console.log(payload.split(`"exp":`)[1])
    } else {
      return null;
    }
  }

  //comprobar tiempo de expiracion del token
  public isLoggedIn(): boolean {
    const user = this.getTokenInfo();
    // console.log(user.exp)
    if (user) {
      // return user.exp > (Date.now() / 1000) + (60 * 60);  // Token de una hora de duración
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  // //obtener un usuario
  // router.get('/:idUsu', UserController.get);
  public getUser(idUsu: number) {
    return this.http.get<User>(`${this.baseUrl}/user/${idUsu}`);
  }

  // //actualizar un usuario
  // router.put('/:idUsu', UserController.update);
  public updateUser(idUsu: number, user) {
    // para convertir el objeto en un string
    // let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/user/${idUsu}`, user, { headers: headers });
  }

  // //actualizar contraseña(email,password,newpassword)
  // router.put('/newpass/:idUsu', UserController.updatePass);
  public updatePass(idUsu: number, data) {
    // para convertir el objeto en un string
    // let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/user/newpass/${idUsu}`,data, { headers: headers });
  }

  // // Eliminar informacion de usuario de la bd (email,password)
  public deleteUser(idUsu: number, data) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // let params = JSON.stringify(data);
    return this.http.post(`${this.baseUrl}/user/deleteUser/${idUsu}`, data,
      { headers: headers });
  }


  // // Follow a user(idUsu,idUsuFollow)
  // router.post('/followUser', UserController.followUser);
  public followUser(ides) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`${this.baseUrl}/user/followUser`, ides,
      { headers: headers });
  }

  // // unfollow a user
  // router.delete('/unFollowUser/:idUsu/:idUnfollow', UserController.unFollowUser);
  public unFollowUser(idUsu: number, idUnfollow: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.delete(`${this.baseUrl}/user/unFollowUser/${idUsu}/${idUnfollow}`, { headers: headers });
  }

  public getUserByName(alias: string) {
    console.log('llego aqui')
    return this.http.get<User[]>(`${this.baseUrl}/user/getUserByName/${alias}`);
  }

  public checkFollow(idUsu: number, idUnfollow: number) {
    return this.http.get<any>(`${this.baseUrl}/user/checkFollow/${idUsu}/${idUnfollow}`);
  }


  // // obtener todos los usuarios que sigues
  // router.get('/getFollowUsers/:idUsu', UserController.getFollowUsers);
  public getFollowUsers(idUsu: number) {
    return this.http.get<User[]>(`${this.baseUrl}/user/getFollowUsers/${idUsu}`);
  }
  // // obtener todos los usuarios que te siguen
  // router.get('/getFollowersUsers/:idUsu', UserController.getFollowersUsers);
  public getFollowersUsers(idUsu: number) {
    return this.http.get<User[]>(`${this.baseUrl}/user/getFollowersUsers/${idUsu}`);
  }

  
  //actualizar img
  // router.put('/newImg/:idUsu/:img', UserController.newImg);


  // public newImg(idUsu: number, img:string) {
  //   let headers = new HttpHeaders().set('Content-Type', 'application/json');
  //   return this.http.put(`${this.baseUrl}/user/newImg/${idUsu}/${img}`,{ headers: headers });
  // }

  public newImg( data) {
    // para convertir el objeto en un string
    // let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(`${this.baseUrl}/user/newImg/user`, data, { headers: headers });
  }
}
