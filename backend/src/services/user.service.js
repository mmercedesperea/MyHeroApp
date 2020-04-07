const BaseService = require('./base.service');
let _userRepository = null;

class UserService extends BaseService {
    constructor({ UserRepository }) {
        super(UserRepository);
        _userRepository = UserRepository;
    }

    // obtener el usuario por su email
    async getUserByemail(email) {
        return await _userRepository.getUserByemail(email);
    }
}


module.exports = UserService;