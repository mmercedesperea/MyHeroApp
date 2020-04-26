const { compareSync, hashSync, genSaltSync } = require('bcryptjs')
// var bcrypt = require('bcrypt-nodejs');
let table = null;
let _DB = null;

class User {
    constructor({ DB }) {
        this.idUsu = 0;
        this.email = "";
        this.password = "";
        this.name = "";
        this.alias = "";
        this.surname = "";
        this.dateOfBirth = "";
        this.photo = "";
        this.admin = "";
        _DB = DB;
        table = "users"
    }

    //

    // para comparar contraseñas encriptadas
    async comparePasswords(UserPas, password) {
        return await compareSync(password, UserPas)
    }

    // para antes de guardar el usuario que se codifique su contraseña
    async pre(user) {
        // se genera el salt
        const salt = genSaltSync(10)
        // console.log(user)
        // y generamos el hash de la contraseña
        const hashedPassword = hashSync(user.password, salt)
        // y la añadimos a nuestro user
        user.password = hashedPassword
        // console.log(user)
        return await user;
    }


    // hash Password
    async hasPass(password) {
        const salt = genSaltSync(10)
        // console.log(user)
        // y generamos el hash de la contraseña
        const hashedPassword = hashSync(password, salt)

        // console.log(user)
        return await hashedPassword;

    }

    // news
    async get(id) {
        return await this.DB.consulta(`SELECT * from ${table} WHERE idUsu =${id}`)
    }

    // decimos que busque a un usuario mediante su email
    async getUserByemail(email) {
        return await _DB.consulta(`SELECT * FROM ${table} WHERE email = '${email}'`);
    }

    // crear unna nueva entidad usuario
    async create(entity) {
        return await _DB.create(`INSERT INTO ${table} ( email, password,alias) VALUES ('${entity.email}', '${entity.password}','${entity.alias}')`);
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

module.exports = User
