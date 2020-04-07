let _db = null

const mysql = require('mysql');

class DBConexion {
    constructor() {
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
        // global.mysqlConnection = mysqlConnection;
    }

    async consulta(sql) {
        return new Promise((resolve, reject) => {
            _db.query(sql,
                (err, rows, fields) => {
                    if (err) { console.log(err); }
                    else if (rows.length > 0) {
                        resolve(rows);
                    }
                    else { resolve(null) }

                });
        });
    }

    async create(sql) {
        return new Promise((resolve, reject) => {
            _db.query(sql,
                (err) => {
                    if (err) console.log(err);
                    // _row = rows
                    // console.log(rows)
                    resolve(console.log("usuario creado"));
                })
        })
    }

    // global.mysqlConnection = mysqlConnection;
    // async dbData(sql) {

    //     const resultado= await _db.query(sql, (err, rows) => {
    //         if (err) console.log(err);
    //         // console.log(rows)
    //         // res.json(rows)
    //         return JSON.stringify(rows);

    //     });

    //     console.log(resultado);

    // }
    // }


}

// console.log(mysqlConnection)

module.exports = DBConexion;


// global.db = db;


