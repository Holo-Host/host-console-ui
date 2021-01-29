const _ = require('lodash')

// mock of normal hpos api responses

const happs = [{
  id: 1,
  name: 'HoloFuel'
}, {
  id: 2,
  name: 'Community'
}, {
  id: 3,
  name: 'Elemental Chat'
}]

// NB: both /api and /holochain-api calls are mocked here
const data = {
  get: {
    '/api/v1/config': {
      admin: {
        public_key: '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5',
        email: 'test@test.com'
      },
      deviceName: "Lana Wilson's HP"
    },
    '/api/v1/profiles/development/features/ssh': {
      enabled: true
    },
    '/holochain-api/v1/hosted_happs': {
      hosted_happs: happs
    }
  },
  put: {
    '/api/v1/config': args => args,
    '/api/v1/profiles/development/features/ssh': {
      enabled: true
    }
  },
  delete: {
    '/api/v1/profiles/development/features/ssh': {
      enabled: false
    }
  }
}


function defaultResponse (method, path, body) {  
  console.log('defaultResponse', {method, path, body})
  const pathsForMethod = data[method]
  if (pathsForMethod) {
    console.log('pathsForMethod', pathsForMethod)
    const response = pathsForMethod[path]
    if (response) {
      console.log('response', response)
      if (_.isFunction(response)) {
        return response(body)
      } else {
        return response
      }
    }
  }

  throw new Error (`Unrecognized request: ${method}:${path}`)
}

module.exports = defaultResponse
