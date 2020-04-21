const { compareSync, hashSync, genSaltSync } = require('bcryptjs')
// var bcrypt = require('bcrypt-nodejs');

class User {
    constructor() {
        this.idUsu = 0;
        this.email = "";
        this.password = "";
        this.name = "";
        this.alias = "";
        this.surname = "";
        this.dateOfBirth = "";
        this.photo = "";
        this.admin = "";
    }

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
}

module.exports = User
