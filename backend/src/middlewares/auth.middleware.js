const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = function (req, res, next) {
    // cogemos nuestro token de los headers 
    const token = req.headers["authorization"];
    if (!token) {
        return res.status(401).send({
            message : "token must be sent" 
        })
       
    }

    // desencriptamos nuestro token con la misma contraseña(JWT_SECRET) que hemos puesto en el env
    //cogemos nuestro token y nuestro secret lo decodificamos y devolvemos el usuario decodificado
    jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
        if (err) {
            
            return res.status(401).send({
                message : "Invalid token" 
            })
        }
        // en el caso de que si exista ese token se mandara el user con sus datos
        // req.user = decodedToken.user;
        // en el caso de que si exista ese token se mandara el user con sus datos
        req.user = decodedToken.user;

        // next hace que se salte al metodo siguiente que tengamos asignado en la ruta
        next();
    });

}