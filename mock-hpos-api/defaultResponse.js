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


const data = {
  get: {   
    '/hosted_happs': {
      hosted_happs: happs
    },
    '/config': {
      admin: {
        public_key: '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5',
        email: 'test@test.com'
      },
      holoportos: {
        network: 'test',
        sshAccess: true
      },
      name: "Lana Wilson's HP"
    }
  },
  put: {
    '/config': args => args
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
