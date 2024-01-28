const serverless = require('serverless-http')
const next = require('next')
const nextHandler = next({ dev: false })

module.exports.handler = serverless(nextHandler.getRequestHandler(), {
  binary: ['*/*'],
  request: (request) => {
    delete request.body
  },
})
