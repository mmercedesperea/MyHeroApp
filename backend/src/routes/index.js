/**
 * express module
 * @const
 */
const express = require('express')
/**
 * cors module
 * @const
 */
const cors = require('cors')
require('express-async-errors')

/**
 * swagger conf
 */
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../swagger/swagger.json')

/**
 * Function to manage the routes of our api
 * @param {function} AdminRoute Route admin
 * @param {function} UserRoutes Route User
 * @param {function} UserHeroRoute Route user hero
 * @param {function} AuthRouters Route authentication
 * @param {function} HeroRoute Route Heroes
 * @param {function} TeamRoute Route team
 */
module.exports = function ({
    AdminRoute,
    UserRoutes,
    AuthRouters,
    ApiHeroRoute,
    HeroRoute,
    UserHeroRoute,
    TeamRoute
}) {
    const router = express.Router()
    const apiRoutes = express.Router()

    /**
     * we inject different elements in our route
     */
    apiRoutes
        //to pass the requests to json
        .use(express.json())
        .use(express.urlencoded({ extended: false }))
        // avoit corts problems
        .use(cors())
    /**
     * we indicate which routes it have to target
     */
    apiRoutes.use('/user', UserRoutes)
    apiRoutes.use('/auth', AuthRouters)
    apiRoutes.use('/apiHero', ApiHeroRoute)
    apiRoutes.use('/hero', HeroRoute)
    apiRoutes.use('/userHero', UserHeroRoute)
    apiRoutes.use('/team', TeamRoute)
    apiRoutes.use('/admin', AdminRoute)
    //swagger route
    apiRoutes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

    // All our routes will use the following route as a base
    router.use('/api', apiRoutes)

    return router
}
