const BaseRepository = require('./base.repository');
// let _user = null;
let table = null;
let _DB = null

class UserRepository extends BaseRepository {
    constructor({ DB }) {
        table = "users"
        super(DB, table)
        // super(table);


        // _table = "users";
    }

    // // decimos que busque a un usuario mediante su atributo username (del modelo user)
    // async getUserByemail(email){
    //     return await _user.findOne({ email});
    // }







}

module.exports = UserRepository;