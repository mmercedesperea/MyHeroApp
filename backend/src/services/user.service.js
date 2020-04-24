const BaseService = require('./base.service');

let _userOBJ = null;
class UserService extends BaseService {
    constructor({  User }) {
        super(User);
        _userOBJ = User
    }

    // obtener el usuario por su email
    async getUserByemail(email) {
        if (!email) {
            const error = new Error();
            error.status = 400;
            error.message = 'Email must be sent';
            throw error;
        }
        return await _userOBJ.getUserByemail(email);
    }

    async updatePass(id, entity) {
        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        // comprobamos que el usuario existe
        const userExist = await this.getUserByemail(entity.email);

        if (!userExist) {
            const error = new Error()
            error.status = 402
            error.message = 'User does not exists'
            throw error
        }
        // guardamos la contraseña del usuario perteneciente a ese emal
        const UserPas = userExist[0].password

        //comporbamos las contraseñas
        const validPassword = await _userOBJ.comparePasswords(UserPas, entity.password)

        if (!validPassword) {
            const error = new Error()
            error.status = 400
            error.message = 'Invalid Password'
            throw error
        }

        // ciframos la nueva contraseña
        entity.newPassword = await _userOBJ.hasPass(entity.newPassword);

        return await _userOBJ.updatePass(id, entity);
    }

    async deleteUser(id, entity) {

        if (!id) {
            const error = new Error();
            error.status = 400;
            error.message = 'id must be sent';
            throw error;
        }
        // comprobamos que el usuario existe
        const userExist = await this.getUserByemail(entity.email);

        if (!userExist) {
            const error = new Error()
            error.status = 402
            error.message = 'User does not exists'
            throw error
        }
        // guardamos la contraseña del usuario perteneciente a ese emal
        const UserPas = userExist[0].password

        //comporbamos las contraseñas
        const validPassword = await _userOBJ.comparePasswords(UserPas, entity.password)

        if (!validPassword) {
            const error = new Error()
            error.status = 400
            error.message = 'Invalid Password'
            throw error
        }

        return await _userOBJ.deleteUser(id);
    }


    async  followUser(body) {
        if (!body.idUsu) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        if (!body.idUsuFollow) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        // insertamos la relacion
        return await _userOBJ.followUser(body)

    }

    async  unFollowUser(body) {
        if (!body.idUsu) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        if (!body.idUsuFollow) {
            const error = new Error()
            error.status = 400
            error.message = 'id must be sent'
            throw error
        }

        // eliminamos la row
        return await _userOBJ.unFollowUser(body)

    }




}


module.exports = UserService;