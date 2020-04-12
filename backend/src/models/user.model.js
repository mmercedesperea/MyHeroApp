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

    //  para que cada vez que se vaya a leer un documento tipo user podamos eliminar el campo contraseña para evitar que se pudiera ver
    // toJSON() {
    //     let user = this.toObject()
    //     delete user.password
    //     return user
    // }

    // para comparar contraseñas encriptadas
    async comparePasswords(UserPas,password) {
       
        return await compareSync(password,UserPas)
    }

    // para antes de guardar el usuario que se codifique su contraseña
    async pre(user) {
        // const user = this;
        // const user = user
        // console.log("llego aqui?");

        // // si el usaurio no esta modificando su contraseña entonces se para a nextpara continuar el flujo
        // if (!user.isModified('password')) {
        //     return next()
        // }
        // pero si, si se esta modificando la contraseña...
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
    async hasPass(password){
        const salt = genSaltSync(10)
        // console.log(user)
        // y generamos el hash de la contraseña
        const hashedPassword = hashSync(password, salt)
        
        // console.log(user)
        return await hashedPassword;

    }
}

module.exports = User
