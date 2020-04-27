let _userService = null;

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

    async followUser(req, res) {
        const { body } = req;
        const  followUser = await _userService.followUser(body);
        console.log(followUser)
        return res.status(201).send({message:followUser});
    }
    
    async unFollowUser(req, res) {
        const { idUsu } = req.params;
        const { idUnfollow } = req.params;
        const  unFollowUser = await _userService.unFollowUser( idUsu,idUnfollow);
        console.log(unFollowUser)
        return res.status(201).send({message:unFollowUser});
    }
    

    // async uploadImage(req,res){
    //     const { idUsu } = req.params;
    //     const file_name = "no subido...";

    //     if(req.files){
            
    //     }

    // }
}
module.exports = UserController;
