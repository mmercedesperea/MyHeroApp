//arranque del servidor
const express = require('express');

let _express =null;
let _config = null;

class Server{
    // inyectamos las dependencias de configuracion y de las rutas
    constructor({config,router}){
        _config = config;
        // le decimos a expres que use nuestras rutas
        _express = express().use(router);
    }

    // iniciamos el servidor
    start(){
        return new Promise(resolve=>{
            _express.listen(_config.PORT, ()=>{
                console.log(_config.APPLICATION_NAME + "Server running on port " + _config.PORT);
                resolve();
            });
        })
    }
}

module.exports = Server;
