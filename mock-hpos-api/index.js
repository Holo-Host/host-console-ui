const express = require('express')
const cors = require('cors')
const _ = require('lodash')
const HpAdminKeypair = require('@holo-host/hp-admin-keypair').HpAdminKeypair
const { signPayload } = require('./authUtils')
const defaultResponse = require('./defaultResponse')

// PJ says: This import has to be async because of the way that dumb webpack interacts with wasm
// It took me more than 2 days to make it work so DO NOT even try to touch this code!
const importHpAdminKeypairClass = async () => {  
  const wasm = await import('@holo-host/hp-admin-keypair')
  return wasm.HpAdminKeypair
}

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
    this.app = express()

    this.app.use(cors())
    this.app.use(this.checkAuth.bind(this))
    this.app.use(this.handleRequest.bind(this))

    this.app.listen(port, () => {
      console.log(`Mock hpos-admin-api listening at http://localhost:${port}`)
    })

    this.initializeResponses()
    this.shouldCheckAuth = !!authEmail && !!authPassword
    this.authEmail = authEmail
    this.authPassword = authPassword
  }

  async checkAuth (req, res, next) {
    if (!this.shouldCheckAuth) {
      next()
    } else {

      const { method, path, body } = req

      // const HpAdminKeypair = importHpAdminKeypairClass()
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
    } catch (e) {
      res.status(500).send(e.message)
    }

    const response = _.isFunction(responseOrResponseFunc) ? responseOrResponseFunc(method.toLowerCase(), removeApiRoot(path), body) : responseOrResponseFunc

    res.send(response)
  }
}

module.exports = MockHposApi
