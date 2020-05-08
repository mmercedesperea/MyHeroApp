let table = null;
let _DB = null;
const apiKey = "105139264478917";
const host = `https://www.superheroapi.com/api/${apiKey}/`;

var rp = require("request-promise");

class Hero {
    constructor({ DB }) {
        this.idHero = 0;
        this.heroName = "";
        this.image = "";
        this.intelligence = "";
        this.strength = "";
        this.speed = "";
        this.durability = "";
        this.power = "";
        this.combat = "";
        this.fullName = "";
        this.placeOfBirth = "";
        this.publisher = "";
        this.alignment = "";
        this.firstApperance = "";
        this.gender = "";
        this.race = "";
        this.height = "";
        this.weight = "";
        this.eyeColor="";
        this.hairColor=";"
        this.work = "";
        this.biography="";
        this.createDate = Date;
        table = "heroes";
        _DB = DB;
    }

    //obtener una entidad por id
    async get(idHero) {
        // console.log(this.table)
        console.log("LA ID ESSS" + idHero);
        if(idHero== 'null'){
            return await null
        }
        // se busca el heroe en la bd
        var _Hero = await _DB.consulta(
            `SELECT * from ${table} WHERE idHero =${idHero}`
        );
        // si heroe no es nul
        if (_Hero != null) {
            // se devuelve ese heroe
            return _Hero[0];
            // si el heroe es null, por lo tanto no esta en nuestra bd
        } else {
            // buscamos en la api y lo guardamos
            _Hero = await this.getHeroByid(idHero);
            // devolvemos el heroe
            return _Hero;
        }
    }

    async getWinner(idHero, idHero2) {
        console.log(idHero)
        console.log(idHero2)

        // se busca el heroe en la bd
        var Hero1 = await _DB.consulta(
            `SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,heroName,image from ${table} WHERE idHero =${idHero}`
        );
        // se busca el heroe2 en la bd
        var Hero2 = await _DB.consulta(
            `SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,heroName,image from ${table} WHERE idHero =${idHero2}`
        );
        // si los puntos totales del hero1 son mayores que el de hero2 devuelve ese
        if (Hero1[0].totalPoints > Hero2[0].totalPoints) {
            return Hero1[0];
            
        } else {
            return Hero2[0];
        }
    }

    async mostIntelligence() {
        return await _DB.consulta(
            `select idHero, heroName, image,  intelligence from heroes ORDER by intelligence DESC LIMIT 1`
        );
    }

    async mostStrength() {
        return await _DB.consulta(
            `select idHero, heroName, image, strength from heroes ORDER by strength DESC LIMIT 1`
        );
    }

    async mostSpeed() {
        return await _DB.consulta(
            `select idHero, heroName, image, speed from heroes ORDER by speed DESC LIMIT 1`
        );
    }

    async mostDurability() {
        return await _DB.consulta(
            `select idHero, heroName, image, durability from heroes ORDER by durability DESC LIMIT 1`
        );
    }

    async mostPower() {
        return await _DB.consulta(
            `select idHero, heroName, image, power from heroes ORDER by power DESC LIMIT 1`
        );
    }

    async mostCombat() {
        return await _DB.consulta(
            `select idHero, heroName, image, combat from heroes ORDER by combat DESC LIMIT 1`
        );
    }

    async newHeros() {
        return await _DB.consulta(
            `select idHero, heroName, image, createDate  FROM heroes ORDER by createDate DESC limit 10`
        );
    }

    async allMarvelHeroes() {
        return await _DB.consulta(
            `select idHero, heroName, image FROM heroes WHERE publisher ='Marvel Comics'`
        );
    }


    async allDCHeroes() {
        return await _DB.consulta(
            `select idHero, heroName, image FROM heroes WHERE publisher ='DC Comics'`
        );
    }

    //api
    async getHeroByName(name) {
        const url = `${host}search/${name}`;
        const heroes = new Array();
        return await rp(url, { json: true })
            .then(function (res) {
                if (res.error) {
                    console.log(res.error)
                    return res.error
                } else {
                    res.results.forEach((her) => {
                        var hero3 = {};
                        hero3.heroName = her.name;
                        hero3.idHero = her.id;
                        hero3.image = her.image.url;
                        heroes.push(hero3);
                    });
                    // devolvemos el array de elementos
                    return heroes;
                }


            })
            .catch(function (err) {
                console.log(err);
                return err;
            });
    }

    // crear unna nueva entidad heroe
    // async insertHero(entity) {
    //     return await _DB.create(
    //         `INSERT INTO heroes ( idHero, heroName,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,work) VALUES ('${entity.idHero}',"${entity.heroName}","${entity.image}",${entity.intelligence},${entity.strength},${entity.speed},${entity.durability},${entity.power},${entity.combat},"${entity.fullName}","${entity.placeOfBirth}","${entity.publisher}","${entity.alignment}","${entity.firstApperance}","${entity.gender}","${entity.race}",'${entity.height}','${entity.weight}',"${entity.work}")`
    //     );
    // }

    //   // crear unna nueva entidad heroe
      async insertHero(entity) {
        return await _DB.createNewHero(
            "INSERT INTO heroes ( idHero, heroName,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,eyeColor,hairColor,work) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", entity);
    }

    async getHeroByid(id) {
        const url = `${host}${id}`;

        var newHeroGet = await rp(url, { json: true })
            .then(function (res) {
                let NewHeroCreate = Hero;
                console.log( res.appearance["hair-color"])
                NewHeroCreate.idHero = res.id;
                NewHeroCreate.heroName = res.name;
                NewHeroCreate.image = res.image.url;
                NewHeroCreate.intelligence = res.powerstats.intelligence === 'null' ? 40 : res.powerstats.intelligence;
                NewHeroCreate.strength = res.powerstats.strength === 'null' ? 40 : res.powerstats.strength;
                NewHeroCreate.speed = res.powerstats.speed === 'null' ? 40 : res.powerstats.speed;
                NewHeroCreate.durability = res.powerstats.durability === 'null' ? 40 : res.powerstats.durability;
                NewHeroCreate.power = res.powerstats.power === 'null' ? 40 : res.powerstats.power;
                NewHeroCreate.combat = res.powerstats.combat === 'null' ? 40 : res.powerstats.combat;
                NewHeroCreate.fullName = res.biography["full-name"] === '' ? 'unknown' : res.biography["full-name"];
                NewHeroCreate.placeOfBirth = res.biography["place-of-birth"] === '-' ? 'unknown' : res.biography["place-of-birth"];
                NewHeroCreate.publisher = res.biography.publisher;
                NewHeroCreate.alignment = res.biography.alignment;
                NewHeroCreate.firstApperance = res.biography["first-appearance"] === '-' ? 'unknown' : res.biography["first-appearance"];
                NewHeroCreate.gender = res.appearance.gender;
                NewHeroCreate.race = res.appearance.race;
                NewHeroCreate.height = res.appearance.height[1];
                NewHeroCreate.weight = res.appearance.weight[1];
                NewHeroCreate.eyeColor = res.appearance["eye-color"];
                NewHeroCreate.hairColor = res.appearance["hair-color"];
                NewHeroCreate.work = res.work.occupation === '-' ? 'unknown' : res.work.occupation;
                return NewHeroCreate;
            })
            .catch(function (err) {
                console.log(err);
                return err;
            });
        //insertamos en la bd
        await this.insertHero(newHeroGet);
        //devolvemos el elemento
        return this.get(newHeroGet.idHero);
    }
}

module.exports = Hero;
