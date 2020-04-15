const BaseRepository = require('./base.repository');
// let _user = null;
let table = null;
let _DB = null

class UserHeroRepository extends BaseRepository {
    constructor({ DB }) {
        table = "usu_hero"
        _DB = DB
        super(DB, table)
    }

    async match(body) {
        return await _DB.consulta(`SELECT * from ${table} WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async InsertUH(body) {
        return await _DB.create(`INSERT INTO ${table} ( idUsu, idHero) VALUES (${body.idUsu}, ${body.idHero})`);
    }

    // actualiza a a follow
    async followUH(body) {
        return await _DB.update(`UPDATE ${table}  SET follow = 1 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    // actualiza a a follow
    async unfollowUH(body) {
        return await _DB.update(`UPDATE ${table}  SET follow = 0 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }


    async favorite(body) {
        return await _DB.update(`UPDATE ${table}  SET favorite = 1 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async unfavorite(body) {
        return await _DB.update(`UPDATE ${table}  SET favorite = 0 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async voteHero(body) {
        return await _DB.update(`UPDATE ${table}  SET score =  ${body.score} WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async commentHero(body) {
        return await _DB.update(`UPDATE ${table}  SET comment =  '${body.comment}' WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async deleteCHero(body) {
        return await _DB.update(`UPDATE ${table}  SET comment =  NULL WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

}

module.exports = UserHeroRepository;