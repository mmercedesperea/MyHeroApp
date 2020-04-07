const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

class User {
    constructor() {
        idUsu;
        name;
        password;
        name;
        alias;
        surname;
        dateOfBirth;
        photo;
        admin;


    }

    //  para que cada vez que se vaya a leer un documento tipo user podamos eliminar el campo contraseña para evitar que se pudiera ver
    toJSON() {
        let user = this.toObject();
        delete user.password;
        return user;
    }

    // para comparar contraseñas encriptadas
    comparePasswords(password) {
        return compareSync(password, this.password);
    }

    // pre  para que antes de que se guarde el usuario se use una funcion de forma asincronica this hara referencia al usuario que se esta guardando
    // pre () {
    pre(user) {

        // const user = this;
        const user = user;

        // si el usaurio no esta modificando su contraseña entonces se para a nextpara continuar el flujo
        if (!user.isModified('password')) {
            return next();
        }
        // pero si, si se esta modificando la contraseña...
        // se genera el salt
        const salt = genSaltSync(10);
        // y generamos el hash de la contraseña
        const hashedPassword = hashSync(user.password, salt);
        // y la añadimos a nuestro user
        user.password = hashedPassword;
        next();
    };

}

module.exports = User;