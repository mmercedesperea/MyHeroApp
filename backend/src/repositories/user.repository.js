const BaseRepository = require('./base.repository');
// let _user = null;
let table = null;
let _DB = null

class UserRepository extends BaseRepository {
    constructor({ DB }) {
        table = "users"
        _DB = DB
        super(DB, table)
    }

    // decimos que busque a un usuario mediante su email
    async getUserByemail(email) {
        return await _DB.consulta(`SELECT * FROM ${table} WHERE email = '${email}'`);
    }

    // crear unna nueva entidad usuario
    async create(entity) {
        return await _DB.create(`INSERT INTO ${table} ( email, password,name) VALUES ('${entity.email}', '${entity.password}','${entity.name}')`);
    }

    // actualiza a un usuario
    async update(idUsu, entity) {
        return await _DB.update(`UPDATE ${table}  SET email = '${entity.email}', name = '${entity.name}', alias = '${entity.alias}',surname ='${entity.surname}' ,dateOfBirth ='${entity.dateOfBirth}' WHERE idUsu = ${idUsu}`);
    }

    // actualiza la contraseña
    async  updatePass(idUsu, entity) {
        return await _DB.update(`UPDATE ${table} SET password = '${entity.newPassword}' WHERE idUsu = ${idUsu}`);
    }

    // eliminar usuario
    async  deleteUser(idUsu) {
        return await _DB.delete(`DELETE FROM ${table} WHERE idUsu = ${idUsu}`);
    }

    async followUser(entity) {
        return await _DB.create(`INSERT INTO follows ( followingIdUsu, followedIdUsu) VALUES (${entity.idUsu},${entity.idUsuFollow})`);
    }

    async  unFollowUser(entity) {
        return await _DB.delete(`DELETE FROM follows WHERE followingIdUsu = ${entity.idUsu} AND followedIdUsu = ${entity.idUsuFollow}`);
    }

}

module.exports = UserRepository;