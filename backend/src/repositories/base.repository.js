
// var db = require('../database/db');
let _DB = null;

// class BaseRepository {
   
    
//     constructor(model){
//         this.model = model;
//     }
   
//     obtener una entidad por id
//     async get(id) {
//         console.log(_DB)
//         mysqlConnection.query(`SELECT * from Users WHERE idUsu =${id}`, (err, rows) => {
//             if (err) console.log(err);
//             console.log( _DB)
//             console.log(id)
//             console.log(rows)

//             return rows;
//         });
//         return await db.query(`SELECT * from Users WHERE idUsu =${id}`)
//     }
    
// }




// module.exports = BaseRepository;



class BaseRepository {
    constructor({ DB }) {
        _DB = DB;
    }


    // constructor(model){
    //     this.model = model;
    // }

    //obtener una entidad por id
    async get(id) {
        console.log("LA ID ESSS"+id)
        return await _DB.consulta(`SELECT * from Users WHERE idUsu =${id}`)
    
    }


}


module.exports = BaseRepository;

