let table = null;
let _DB = null;
const apiKey = '105139264478917'
const host = `https://www.superheroapi.com/api/${apiKey}/`

var rp = require('request-promise')

class Hero {
    constructor({DB}) {
        this.idHero = 0;
        this.name = "";
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
        this.work = "";
        this.createDate = Date;
        table = "heroes";
        _DB = DB;
    }

    
    //obtener una entidad por id
    async get(idHero) {
        // console.log(this.table)
        console.log('LA ID ESSS' + idHero)
        // se busca el heroe en la bd
        var _Hero= await _DB.consulta(`SELECT * from ${table} WHERE idHero =${idHero}`)

        console.log(_Hero);
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

        // se busca el heroe en la bd
        var Hero1 = await _DB.consulta(`SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,name,image from ${table} WHERE idHero =${idHero}`)

        // se busca el heroe2 en la bd
        var Hero2 = await _DB.consulta(`SELECT SUM (intelligence + strength + speed +durability +power +combat) as totalPoints,idHero,name,image from ${table} WHERE idHero =${idHero2}`)
        console.log(Hero1[0].totalPoints)
        console.log(Hero2[0].totalPoints)

        // si los puntos totales del hero1 son mayores que el de hero2 devuelve ese
        if (Hero1[0].totalPoints > Hero2[0].totalPoints) {
            return Hero1[0];
        } else {
            return Hero2[0];
        }

    }

    async mostIntelligence() {
        return await _DB.consulta(`select idHero, name, image,  intelligence from heroes ORDER by intelligence DESC LIMIT 1`)
    }

    async mostStrength() {
        return await _DB.consulta(`select idHero, name, image, strength from heroes ORDER by strength DESC LIMIT 1`)
    }

    async mostSpeed() {
        return await _DB.consulta(`select idHero, name, image, speed from heroes ORDER by speed DESC LIMIT 1`)
    }

    async mostDurability() {
        return await _DB.consulta(`select idHero, name, image, durability from heroes ORDER by durability DESC LIMIT 1`)
    }

    async mostPower() {
        return await _DB.consulta(`select idHero, name, image, power from heroes ORDER by power DESC LIMIT 1`)
    }

    async mostCombat() {
        return await _DB.consulta(`select idHero, name, image, combat from heroes ORDER by combat DESC LIMIT 1`)
    }

    async newHeros() {
        return await _DB.consulta(`select idHero, name, image, createDate  FROM heroes ORDER by createDate DESC limit 10`)
    }

    //api
    async getHeroByName(name) {
        const url = `${host}search/${name}`
        const heroes = new Array()

        return await rp(url, { json: true })
            .then(function (res) {
                res.results.forEach(her => {
                    var hero3 = {}
                    hero3.name = her.name
                    hero3.idHero = her.id
                    hero3.image = her.image.url
                    // console.log(NHero.idHero)
                    heroes.push(hero3)
                    // console.log(heroes)
                    // console.log(' ')
                })
                // devolvemos el array de elementos
                return heroes
            })
            .catch(function (err) {
                console.log(err)
                return err
            })
    }

    // crear unna nueva entidad heroe
    async insertHero(entity) {
        return await _DB.create(
            `INSERT INTO heroes ( idHero, name,image,intelligence,strength,speed,durability,power,combat,fullName,placeOfBirth,publisher,alignment,firstAppearance,gender,race,height,weight,work) VALUES ('${entity.idHero}','${entity.name}','${entity.image}',${entity.intelligence},${entity.strength},${entity.speed},${entity.durability},${entity.power},${entity.combat},'${entity.fullName}','${entity.placeOfBirth}','${entity.publisher}','${entity.alignment}','${entity.firstApperance}','${entity.gender}','${entity.race}','${entity.height}','${entity.weight}','${entity.work}')`
        )
    }

    async getHeroByid(id) {
        const url = `${host}${id}`
        console.log(url)

        var newHeroGet = await rp(url, { json: true })
            .then(function (res) {
                // var NewHero =   Hero;
                var NewHero =  {};

                NewHero.idHero = res.id
                NewHero.name = res.name
                NewHero.image = res.image.url
                NewHero.intelligence = res.powerstats.intelligence
                NewHero.strength = res.powerstats.strength
                NewHero.speed = res.powerstats.speed
                NewHero.durability = res.powerstats.durability
                NewHero.power = res.powerstats.power
                NewHero.combat = res.powerstats.combat
                NewHero.fullName = res.biography['full-name']
                NewHero.placeOfBirth = res.biography['place-of-birth']
                NewHero.publisher = res.biography.publisher
                NewHero.alignment = res.biography.alignment
                NewHero.firstApperance = res.biography['first-appearance']
                NewHero.gender = res.appearance.gender
                NewHero.race = res.appearance.race
                NewHero.height = res.appearance.height[1]
                NewHero.weight = res.appearance.weight[1]
                NewHero.work = res.work.occupation
                return NewHero
            })
            .catch(function (err) {
                console.log(err)
                return err
            })
        //insertamos en la bd
        await this.insertHero(newHeroGet)

        //devolvemos el elemento
        return newHeroGet
    }


}

module.exports = Hero;