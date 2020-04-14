let _userService = null;
// const util = require('util')

class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    //obtener usuario por id
    async get(req, res) {
        const { idUsu } = req.params;
        const user = await _userService.get(idUsu);
        //    JSON.stringify(user)
        return res.send(user);
    }

    async update(req, res) {
        const { idUsu } = req.params;
        const { body } = req;
        const updateUser = await _userService.update(idUsu, body);
        console.log(updateUser)
        return res.status(201).send({message:updateUser});
    }
    
    async updatePass(req, res) {
        const { idUsu } = req.params;
        const { body } = req;
        const  updatePass = await _userService.updatePass(idUsu, body);
        console.log( updatePass)
        return res.status(201).send({message: updatePass});
    }

    async delete(req, res) {
        const { idUsu } = req.params;
        const { body } = req;
        const  deleteUser = await _userService.deleteUser(idUsu, body);
        console.log( deleteUser)
        return res.status(201).send({message: deleteUser});

    }
    

    // async uploadImage(req,res){
    //     const { idUsu } = req.params;
    //     const file_name = "no subido...";

    //     if(req.files){
            
    //     }

    // }
}
module.exports = UserController;
