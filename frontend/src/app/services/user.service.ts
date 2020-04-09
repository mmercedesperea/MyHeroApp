import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  //variable almacenamos la url de nuestra api node
  private baseUrl: string = environment.BASE_API_URL;

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
}
