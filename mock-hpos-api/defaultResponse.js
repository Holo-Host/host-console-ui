const _ = require('lodash')

// mock of normal hpos api responses

const happs = [{
  id: 1,
  name: 'HoloFuel',
  enabled: true,
  sourceChains: 110,
  storage: 3902834,
  usage: {
    bandwidth: 349082,
    cpu: 49083408432
  }
}, {
  id: 2,
  name: 'Community',
  enabled: true,
  sourceChains: 79,
  storage: 709049842834,
  usage: {
    bandwidth: 59084358,
    cpu: 83408432
  }
}, {
  id: 3,
  name: 'Elemental Chat',
  enabled: true,
  sourceChains: 34,
  storage: 50949882,
  usage: {
    bandwidth: 98559083,
    cpu: 595430
  }
}, {
  id: 4,
  name: 'A disabled happ you should never see',
  enabled: false
}]

const dashboard = {
  totalSourceChains: 387,
  currentTotalStorage: 590348543805,
  usage: {
    cpu: 39084093988,
    bandwidth: 5094853480509
  }
}

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
    '/holochain-api/v1/hosted_happs': happs,
    '/holochain-api/v1/dashboard': dashboard    
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
  const pathsForMethod = data[method]
  if (pathsForMethod) {
    const response = pathsForMethod[path]
    if (response) {
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
