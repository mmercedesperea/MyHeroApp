const BaseService = require ('./base.service');
let _userRepository = null;

class UserService extends BaseService{
    constructor ({UserRepository}){
        super(UserRepository);
        _userRepository = UserRepository;
    }


    // async getUserByemail(email){
    //     return await _userRepository.getUserBymail(email);
    // }
}


module.exports = UserService;