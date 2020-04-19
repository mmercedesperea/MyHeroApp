let table = null;
let _DB = null;

class TeamRepository {
    constructor({ DB }) {
        table = 'team';
        _DB = DB;
    }

    async create(entity) {
        return await _DB.create(`INSERT INTO ${table} (idUsu,teamName) VALUES (${entity.idUsu},'${entity.teamName}')`);
    }

    async checkTeam(idTeam) {
        return await _DB.consulta(`SELECT * FROM ${table} WHERE idTeam = ${idTeam} AND member_1 + member_2 + member_3 +member_4 + member_5 is not null`);
    }

    async get(idTeam) {
        return await _DB.consulta(`SELECT a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5,  SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b WHERE a.idTeam =${idTeam} AND  b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5)`);
    }

    // update name
    async update(idTeam, entity) {
        return await _DB.update(`UPDATE ${table}  SET teamName = '${entity.teamName}' WHERE idTeam = ${idTeam}`);
    }

    // // añadir miembro
    async addMember(idTeam, entity) {
        return await _DB.update(`UPDATE ${table}  SET ${entity.member} = ${entity.codHero} WHERE idTeam = ${idTeam}`);
    }

    // eliminar un miembro del equipo
    async  deleteMember(idTeam, entity) {
        return await _DB.update(`UPDATE ${table} SET ${entity.member} = NULL WHERE idTeam = ${idTeam}`);
    }

    async delete(idTeam) {
        return await _DB.delete(`DELETE FROM ${table} WHERE idTeam = ${idTeam}`);
    }

}

module.exports = TeamRepository;