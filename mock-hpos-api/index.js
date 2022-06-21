const HpAdminKeypair = require('@holo-host/hp-admin-keypair').HpAdminKeypair
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const _ = require('lodash')
const { verifySignedRequest } = require('./authUtils')
const defaultResponse = require('./defaultResponse')

const kHttpStatuses = {
  UNAUTHORISED: 401,
  SERVER_ERROR: 500
}

const HC_PUBKEY = '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'

function generateResponseKey(method, path, data) {
  return `${method}:${path}:${JSON.stringify(data)}`
}

// NEXT_PATH is used to key a next response in place of an actual path. It's required to be different from any value that could come from req.path
const NEXT_PATH = ' . next . '

const NEXT_RESPONSE_KEY = generateResponseKey('', NEXT_PATH, {})

class MockHposApi {
  constructor(port, authEmail, authPassword) {
    this.port = port
    this.shouldCheckAuth = !!authEmail && !!authPassword
    this.authEmail = authEmail
    this.authPassword = authPassword

    this.initializeResponses()
  }

  static async start(port, authEmail, authPassword) {
    const mockHposApi = new MockHposApi(port, authEmail, authPassword)

    const app = express()

    app.use(cors())
    app.use(bodyParser.json())
    app.use(mockHposApi.checkAuth.bind(mockHposApi))
    app.use(mockHposApi.handleRequest.bind(mockHposApi))

    await mockHposApi.startServer(app)

    return mockHposApi
  }

  // this is more convoluted than I'd like because I want init to be a blocking call, so have to uncallback app.listen
  startServer(app) {
    return new Promise((resolve, reject) => {
      this.server = app
        .listen(this.port, () => {
          console.log(`Mock hpos-admin-api listening at http://localhost:${this.port}`)
          resolve()
        })
        .on('error', reject)
    })
  }

  checkAuth(req, res, next) {
    if (!this.shouldCheckAuth) {
      next()
    } else {
      const { method, originalUrl, body } = req

      const keypair = new HpAdminKeypair(HC_PUBKEY, this.authEmail, this.authPassword)
      const signature = req.header('x-hpos-admin-signature')
      const valid = verifySignedRequest(signature, method, originalUrl, body, keypair)

      if (valid) {
        next()
      } else {
        res.status(kHttpStatuses.UNAUTHORISED).end()
      }
    }
  }

  any(response) {
    this.anyResponse = response
  }

  next(response) {
    this.once('', NEXT_PATH, {}, response)
  }

  once(method, path, body, response) {
    const responseKey = generateResponseKey(method, path, body)

    if (!this.responseQueues[responseKey]) {
      this.responseQueues[responseKey] = []
    }

    this.responseQueues[responseKey].push(response)
  }

  getSavedResponse(method, type, data) {
    let responseKey

    // if there are responses in the 'next' queue, we use those and ignore the specific type and data of the request
    if (!_.isEmpty(this.responseQueues[NEXT_RESPONSE_KEY])) {
      responseKey = NEXT_RESPONSE_KEY
    } else {
      responseKey = generateResponseKey(method, type, data)
    }

    if (!this.responseQueues[responseKey]) {
      if (this.anyResponse) {
        return this.anyResponse
      }

      throw new Error(`No more responses for: ${responseKey}`)
    }

    return this.responseQueues[responseKey].shift()
  }

  initializeResponses() {
    this.responseQueues = {}
    // sets the `any` response which is called as a fallback when no other response has been specified.
    // In this case, defaultResponse is a mock of normal behavior of the hpos apis
    this.anyResponse = defaultResponse
  }

  handleRequest(req, res) {
    const { method, path, body } = req

    let responseOrResponseFunc

    try {
      responseOrResponseFunc = this.getSavedResponse(method, path, body)
    } catch (e) {
      res.status(kHttpStatuses.SERVER_ERROR).send(e.message)
    }

    const response = _.isFunction(responseOrResponseFunc)
      ? responseOrResponseFunc(method.toLowerCase(), path, body)
      : responseOrResponseFunc

    res.send(response)
  }

  close() {
    this.server.close()
  }
}

module.exports = MockHposApi
