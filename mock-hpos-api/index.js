const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const stringify = require('fast-json-stable-stringify')
const _ = require('lodash')
const HpAdminKeypair = require('@holo-host/hp-admin-keypair').HpAdminKeypair
const { signPayload, hashString } = require('./authUtils')
const defaultResponse = require('./defaultResponse')

const HC_PUBKEY = '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5'

const API_ROOT = '/api/v1'

function removeApiRoot (path) {
  if (path.indexOf(API_ROOT) == 0) {
    return path.slice(API_ROOT.length);
  } else {
    return path
  }
}

function generateResponseKey (method, path, data) {
  return `${method}:${removeApiRoot(path)}:${JSON.stringify(data)}`
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

  static async start (port, authEmail, authPassword) {
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
  startServer (app) {
    return new Promise((resolve, reject) => {
      this.server = app.listen(this.port, () => {
        console.log(`Mock hpos-admin-api listening at http://localhost:${this.port}`)
        resolve()
      }).on('error', reject)
    })
  }

  async checkAuth (req, res, next) {
    if (!this.shouldCheckAuth) {
      next()
    } else {

      const { method, path, body } = req

      const keypairInstance = new HpAdminKeypair(HC_PUBKEY, this.authEmail, this.authPassword)

      const signature = await signPayload(keypairInstance, method, path, body)

      if (signature === req.header('x-hpos-admin-signature')) {
        next()
      } else {
        res.status(401).end()
      }
    }
  }

  any (response) {
    this.anyResponse = response
  }

  next (response) {
    this.once(NEXT_PATH, {}, response)
  }

  once (path, body, response) {
    const responseKey = generateResponseKey(method, path, body)

    if (!this.responseQueues[responseKey]) {
      this.responseQueues[responseKey] = []
    }
  
    this.responseQueues[responseKey].push(response)  
  }

  getSavedResponse (method, type, data) {
    let responseKey

    // if there are responses in the 'next' queue, we use those and ignore the specific type and data of the request
    if (!_.isEmpty(this.responseQueues[NEXT_RESPONSE_KEY])) {
      responseKey = NEXT_RESPONSE_KEY
    } else {
      responseKey = generateResponseKey(method, type, data)
    }

    if (!this.responseQueues[responseKey]) {
      if (this.anyResponse) return this.anyResponse

      throw new Error(`No more responses for: ${responseKey}`)
    }

    return this.responseQueues[responseKey].shift()
  }

  initializeResponses () {
    this.responseQueues = {}
    this.anyResponse = defaultResponse
  }

  handleRequest (req, res) {
    const { method, path, body } = req

    let responseOrResponseFunc 
    try {
      responseOrResponseFunc = this.getSavedResponse(method, path, body)
      console.log('responseOrResponseFunc', responseOrResponseFunc)
    } catch (e) {
      res.status(500).send(e.message)
    }

    const response = _.isFunction(responseOrResponseFunc) ? responseOrResponseFunc(method.toLowerCase(), removeApiRoot(path), body) : responseOrResponseFunc

    res.send(response)
  }

  close () {
    this.server.close()
  }
}

module.exports = MockHposApi
