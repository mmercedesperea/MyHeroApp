import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Hero}  from '../models/hero';



@Injectable({
  providedIn: 'root'
})
export class HeroService {
    //variable almacenamos la url de nuestra api node
    private baseUrl: string = environment.BASE_API_URL;

  constructor(private http: HttpClient) { }

  // Model
  // public getTechnologies() {
  //   // esto nos va a devolver una coleccion de tecnologias
  //   return this._http.get<Technology[]>(this.baseUrl + "/technologies");
  // }

  // routes

  // //obtener un heroe por el nombre
  public getHeroByName(name:string){
    return this.http.get<Hero[]>(`${this.baseUrl}/apiHero/search/${name}`);
  }

  // //obtener un heroe por el id
  public getHeroById(id:number){
    // return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`);
    return this.http.get<Hero>(`${this.baseUrl}/hero/${id}`);
  }


}



    // //obtener un heroe por el nombre
    // router.get('/search/:name', ApiHeroController.get);

    // // obtener un heroe por id
    // router.get('/searchByid/:id', ApiHeroController.getHeroByid);


// //obtener un heroe ganador
// router.get('/getWinner/:idHero/:idHero2', HeroController.getWinner);

// //obtener el heroe mas inteligente
// router.get('/stats/mostIntelligence', HeroController.mostIntelligence);

// //obtener el heroe mas fuerte
// router.get('/stats/mostStrength', HeroController.mostStrength);

// //obtener el heroe mas rapido
// router.get('/stats/mostSpeed', HeroController.mostSpeed);

// //obtener el heroe mas durability
// router.get('/stats/mostDurability', HeroController.mostDurability);

// //obtener el heroe mas poder
// router.get('/stats/mostPower', HeroController.mostPower);

// //obtener el heroe mas combate
// router.get('/stats/mostCombat', HeroController.mostCombat);

// //obtener ultimos heroes añadidos
// router.get('/new/heros', HeroController.newHeros);
