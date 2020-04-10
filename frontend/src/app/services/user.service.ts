import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

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

  // Model



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
    if(token){
      //cortamos el token desde el punto que nos interesa
      payload =token.split('.')[1];
    //  utilizamos window.atob que descodifica una cadena de datos que ha sido codificada utilizando la codificación en base-64
      payload =window.atob(payload);
      
     return JSON.parse(payload);
      //  // JSON.parse(payload);
      //  payload.split(`"exp":`)[1];
      
      //  payload.split("}")[0];
      //  console.log(payload)
      // console.log(payload.split(`"exp":`)[1])
    }else{
      return null;
    }
  }


   //comprobar tiempo de expiracion del token
   public isLoggedIn(): boolean {
    const user = this.getTokenInfo();
    console.log(user.exp)
    if (user) {
      // return user.exp > (Date.now() / 1000) + (60 * 60);  // Token de una hora de duración
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
}
