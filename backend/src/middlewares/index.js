/**
 * We export the module with the elements that compose it
 */
module.exports= {
    NotFoundMiddleware: require('./not-found.middleware'),
    ErrorMiddleware: require('./error.middleware'),
    AuthMiddleware: require('./auth.middleware'),
    AdminAuth: require('./adminAuth.middleware')

};