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
    }
  }
}


function defaultResponse (method, path) {
  const pathsForMethod = data[method]
  if (pathsForMethod) {
    const response = pathsForMethod[path]
    if (response) {
      return response
    }
  }

  throw new Error (`Unrecognized request: ${method}:${path}`)
}

module.exports = defaultResponse