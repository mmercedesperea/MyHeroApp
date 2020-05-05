let _userService = null;

class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    //obtener usuario por id
    async get(req, res) {
        const { idUsu } = req.params;

        const user = await _userService.get(idUsu);
        console.log(user.password)

        user[0].password="0";
        //    JSON.stringify(user)
        console.log(user[0])
        return res.send(user[0]);
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
        const  updatePass = await _userService.updatePass(idUsu,body);
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

    //Buscar un usuario por nombre
    async getUserByName(req, res) {
        const { userName} = req.params;

        const user = await _userService.getUserByName(userName);
       console.log(user)
        return res.send(user);
    }
    
    async checkFollow(req, res) {
        const { idUsu } = req.params;
        const { idUnfollow } = req.params;
        const  checkFollow = await _userService.checkFollow( idUsu,idUnfollow);
       
        return res.send( checkFollow);
    }
    // async uploadImage(req,res){
    //     const { idUsu } = req.params;
    //     const file_name = "no subido...";

    //     if(req.files){
            
    //     }

    // }
}
module.exports = UserController;
