let _userService = null;

class UserController {
    constructor({ UserService }) {
        _userService = UserService;
    }

    async get(req, res) {
        const { idUsu } = req.params;
        const user = await _userService.get(idUsu);
        return res.send(user);
    }
}
module.exports = UserController;
