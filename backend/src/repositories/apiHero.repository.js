const apiKey = '105139264478917'
const host = `https://www.superheroapi.com/api/${apiKey}/`

var rp = require('request-promise')
// const heroes = new Array;
let hero = null
let _DB = null


class ApiHeroRepository {
    constructor({ Hero, DB }) {
        hero = Hero
        _DB = DB
        // heroes;
    }

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
                var NewHero = hero

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

module.exports = ApiHeroRepository
