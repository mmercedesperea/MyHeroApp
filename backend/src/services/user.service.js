const BaseService = require ('./base.service');
let _userRepository = null;

class UserService extends BaseService{
    constructor ({UserRepository}){
        super(UserRepository);
        _userRepository = UserRepository;
    }


    // async getUserByUserAlias(alias){
    //     return await _userRepository.getUserByUserAlias(alias);
    // }
}


module.exports = UserService;