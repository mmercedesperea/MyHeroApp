let table = null;
let _DB = null;

class Team {
    constructor({ DB }) {
        this.idTeam = 0;
        this.idUsu = 0;
        this.teamName = "";
        this.member_1 = "";
        this.member_2 = "";
        this.member_3 = "";
        this.member_4 = "";
        this.member_5 = "";
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

    async getTeamUsu(idUsu) {
        return await _DB.consulta(`SELECT h.*,T.*,(SELECT SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b WHERE a.idTeam =t.idTeam AND  b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5)) as totalPoint FROM heroes h JOIN team t ON ( h.idHero = t.member_1 or h.idHero = t.member_2 or h.idHero = t.member_3 or h.idHero = t.member_4 or h.idHero = t.member_5) WHERE t.idUsu= ${idUsu}`);
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

    // bestTeam
    async bestTeam() {
        return await _DB.consulta(`SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) GROUP BY a.teamName ORDER by totalPoint DESC LIMIT 1`);

    }

    async getTeamInfo(idUsu) {
        return await _DB.consulta(`SELECT * FROM team  WHERE idUsu =${idUsu}`);
    }

    async getTeamWinner(idTeam1,idTeam2) {
        console.log(idTeam1)
        console.log(idTeam2)

        // se busca el heroe en la bd
        var Team1 = await _DB.consulta(
            
            `SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and idTeam= ${idTeam1} GROUP BY a.teamName ORDER by totalPoint`
        );
        // se busca el heroe2 en la bd
        var Team2 = await _DB.consulta(
            `SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and idTeam= ${idTeam2} GROUP BY a.teamName ORDER by totalPoint`
        );
        // si los puntos totales del hero1 son mayores que el de hero2 devuelve ese
        if (Team1[0].totalPoint > Team2[0].totalPoint) {
            return Team1[0];

        } else {
            return Team2[0];
        }
    }

    // searchTeam

    async searchTeam(teamName) {
        console.log('llego aqui'+teamName)
        return await _DB.consulta(`SELECT c.alias,a.idTeam,a.idUsu,a.teamName,a.member_1,a.member_2,a.member_3,a.member_4,a.member_5, SUM(b.intelligence + b.strength + b.speed + b.durability +b.power +b.combat) as totalPoint FROM team a, heroes b, users c WHERE a.idUsu = c.idUsu AND b.idHero IN (a.member_1, a.member_2, a.member_3,a.member_4,a.member_5) and teamName LIKE '${teamName}%' GROUP BY a.teamName ORDER by totalPoint
        `)
    }

}

module.exports = Team