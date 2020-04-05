
const container = require('./src/startup/container');
const server = container.resolve('server');
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'myheroapp'

});

mysqlConnection
    .connect((err) => {
        if (err) throw err;
        console.log("DB is connected");
        // inicia el servidor
        server.start()
        .catch(console.log)
    })
    

