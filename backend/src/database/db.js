

// const mysql = require('mysql');

// const mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     port: '3306',
//     user: 'root',
//     password: '',
//     database: 'myheroapp'

// });

// // function DBStart() {
// mysqlConnection
//     .connect((err) => {
//         if (err) throw err;
//         console.log("DB is connected");

//         // }
//     });
// // console.log(mysqlConnection)
// global.mysqlConnection = mysqlConnection;

// module.exports = mysqlConnection;



let _db = null
let pruebab =null;

const mysql = require('mysql');

class DBConexion {
    constructor(){
        pruebabd: ""
        
    }

    async conexion(req, res) {

        const mysqlConnection = mysql.createConnection({
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: '',
            database: 'myheroapp'

        });
        // function DBStart() {
        mysqlConnection
            .connect((err) => {
                if (err) throw err;
                console.log("DB is connected");

                // }
            });

        _db = mysqlConnection
    }

    async consulta(sql) {
        // const mysqlConnection = mysql.createConnection({
        //     host: 'localhost',
        //     port: '3306',
        //     user: 'root',
        //     password: '',
        //     database: 'myheroapp'

        // });

        // // function DBStart() {
        // mysqlConnection
        //     .connect((err) => {
        //         if (err) throw err;
        //         console.log("DB is connected");

        //         // }
        //     });
        return await _db.query(sql, (err, rows) => {
            if (err) console.log(err);
            console.log(rows)
            // res.json(rows)
            return rows
           
        });
    }
    // }


}

// console.log(mysqlConnection)

module.exports = DBConexion;


// global.db = db;


