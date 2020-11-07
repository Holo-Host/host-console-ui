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
    '/v1/hosted_happs': {
      hosted_happs: happs
    }
  }
}

export default data
