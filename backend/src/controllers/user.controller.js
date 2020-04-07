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
        return res.send(user);
    }
}
module.exports = UserController;
