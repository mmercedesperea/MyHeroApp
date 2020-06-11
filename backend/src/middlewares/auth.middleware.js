const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

/**
 * Function to check if the user has a valid token
 * @param {object} req Element with the header info
 * @return {any} res if the user has a valid token or not
 */
module.exports = function (req, res, next) {
    /**
     * we take our token from the headers
     */
    const token = req.headers['authorization']
    if (!token) {
        return res.status(401).send({
            message: 'token must be sent'
        })
    }

    // we decrypt our token with the same password (JWT_SECRET) that we have put in the env
    // we take our token and our secret we decode it and return the decoded user
    jwt.verify(token, JWT_SECRET, function (err, decodedToken) {
        if (err) {
            return res.status(401).send({
                message: 'Invalid token'
            })
        }

        // in the event that if that token exists, the user will be sent with their data
        req.user = decodedToken.user

        // next makes it jump to the next method that we have assigned in the route
        next()
    })
}
