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

    // actualiza a a follow
    async followUH(body) {
        return await _DB.update(`UPDATE ${table}  SET follow = 1 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }
}

module.exports = UserHeroRepository;