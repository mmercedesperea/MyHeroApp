const express = require('express')

let _express = null
/**
 * to store the server conf
 */
let _config = null

/**
 * server boot
 */
class Server {
  /**
   * we inject the dependencies of configuration and the routes
   */
  constructor ({ config, router }) {
    _config = config
    // le decimos a expres que use nuestras rutas
    _express = express().use(router)
  }

  /**
   * function to start the server
   * @returns promise
   */
  start () {
    return new Promise(resolve => {
      _express.listen(_config.PORT, () => {
        console.log(
          _config.APPLICATION_NAME + 'Server running on port ' + _config.PORT
        )
        resolve()
      })
    })
  }
}

module.exports = Server
