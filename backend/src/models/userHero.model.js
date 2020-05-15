let table = null;
let _DB = null;

class UserHero {
    constructor({ DB }) {
        this.idUsu = 0;
        this.idHero = 0;
        this.score = 0;
        this.comment = "";
        this.favorite = 0;
        this.follow = 0;
        table = "usu_hero";
        _DB = DB;
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
        return await _DB.update(`UPDATE ${table}  SET follow = 0, favorite = 0 WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    }

    async favoriteUH(body) {
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
    async get(id) {
        return await _DB.consulta(`SELECT h.*,u.score FROM heroes h,usu_hero U where h.idHero = U.idHero and U.follow= 1 AND U.favorite=0 and U.idUsu=${id}`)
    }

    async getFav(id) {
        return await _DB.consulta(`SELECT h.*,u.score FROM heroes h,usu_hero U where h.idHero = U.idHero and U.favorite= 1 and U.idUsu=${id}`)
    }
    
    
    async getCommentHero(idUser,idHero) {
        return await _DB.consulta(`SELECT comment from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`)
    }

    async getVoteHero(idUser,idHero) {
        return await _DB.consulta(`SELECT score from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`)
    }

    async bestMarverHero() {
        return await _DB.consulta(`select a.idHero, a.heroName, a.image, ROUND(sum(b.score) / count(a.idHero),1) as score FROM heroes a, usu_hero b  WHERE a.publisher = 'Marvel Comics' AND a.idHero = b.idHero GROUP by idHero ORDER by score DESC`)
    }

    async bestDCHero() {
        return await _DB.consulta(`select a.idHero, a.heroName, a.image, ROUND(sum(b.score) / count(a.idHero),1) as score FROM heroes a, usu_hero b  WHERE a.publisher = 'DC Comics' AND a.idHero = b.idHero GROUP by idHero ORDER by score DESC`)
    }

    async mostFollowHeros() {
        return await _DB.consulta(`select a.idHero, a.heroName, a.image, count(a.idHero) as followers FROM heroes a, usu_hero b WHERE a.idHero = b.idHero AND b.follow = 1 GROUP by idHero ORDER by followers DESC LIMIT 10`)
    }

    async getHeroUsu(idUser,idHero) {
        return await _DB.consulta(`SELECT * from ${table} WHERE idUsu =${idUser} AND idHero =${idHero}`)
    }

    async getHeroComments(idHero) {
        return await _DB.consulta(`SELECT UH.comment,U.alias,U.idUsu,U.photo from usu_hero UH JOIN users U ON(U.idUsu = UH.idUsu) where idHero = ${idHero}`)
    }


    // async modifyCHero(body) {
    //     return await _DB.update(`UPDATE ${table}  SET comment =  '${body.comment}' WHERE idUsu = ${body.idUsu} AND idHero = ${body.idHero}`);
    // }
    
}

module.exports = UserHero;