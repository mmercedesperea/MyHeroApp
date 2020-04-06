let _userService = null;
const util = require('util')

class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async get(req, res) {
        const { idUsu } = req.params;
        const user = await _userService.get(idUsu);
        //    JSON.stringify(user)
        // console.log(user)
        //    console.log("probando " +util.inspect(user, {showHidden: false, depth: null}))
        //    console.log("probando a ver si sale algo" + user)
          
        return res.send(user);
    }
}
module.exports = UserController;
