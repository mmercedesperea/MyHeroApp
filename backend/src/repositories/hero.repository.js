let table = null;
let _DB = null;
let _ApiHeroRepository = null;

class HeroRepository {
    constructor({ DB, ApiHeroRepository }) {
        table = "heroes";
        _ApiHeroRepository = ApiHeroRepository;
        _DB = DB;
        // super(DB, table)
    }

    //obtener una entidad por id
    async get(idHero) {
        // console.log(this.table)
        console.log('LA ID ESSS' + idHero)
        // se busca el heroe en la bd
        var Hero = await _DB.consulta(`SELECT * from ${table} WHERE idHero =${idHero}`)

        console.log(Hero);
        // si heroe no es nul
        if (Hero != null) {
            // se devuelve ese heroe
            return Hero[0];
            // si el heroe es null, por lo tanto no esta en nuestra bd
        } else {

            // buscamos en la api y lo guardamos
            var ApiHero = await _ApiHeroRepository.getHeroByid(idHero);

            // devolvemos el heroe

            return ApiHero;
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

}

module.exports = HeroRepository;