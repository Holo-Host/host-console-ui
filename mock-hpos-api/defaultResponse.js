const _ = require('lodash')

// mock of normal hpos api responses

const happs = [
  {
    id: '1',
    name: 'HoloFuel',
    enabled: true,
    sourceChains: 110,
    storage: 3902834,
    usage: {
      bandwidth: 349082,
      cpu: 49083408432
    }
  },
  {
    id: '2',
    name: 'Community',
    enabled: true,
    sourceChains: 79,
    storage: 709049842834,
    usage: {
      bandwidth: 59084358,
      cpu: 83408432
    }
  },
  {
    id: '3',
    name: 'Elemental Chat',
    enabled: true,
    sourceChains: 34,
    storage: 50949882,
    usage: {
      bandwidth: 98559083,
      cpu: 595430
    }
  },
  {
    id: '4',
    name: 'A disabled happ you should never see',
    enabled: false
  }
]

const usage = {
  totalHostedHapps: 1,
  totalSourceChains: 0,
  currentTotalStorage: 0,
  totalUsage: { cpu: 0, bandwidth: 0 }
}

const earnings = {
  earnings: { last30days: 1343209.4, last7days: 447768.54, lastday: 34209.4 },
  holofuel: { balance: '0' },
  recentPayments: [
    {
      id: 1,
      amount: 167504.4,
      status: 'received',
      updatedAt: Date.now(),
      happ: {
        name: 'HoloFuel',
        id: 123
      },
      invoiceDetails: {
        start: '',
        end: '',
        bandwidth: {
          price: 1234, // hosting bandwidth prices hf/mb
          quantity: 1 // traffic serviced (should be in mb) - to calculate bandwidth,
        },
        compute: {
          price: 12,
          quantity: 234
        },
        storage: {
          price: 432
        }
      }
    },
    {
      id: 2,
      amount: 987334.34,
      status: 'received',
      updatedAt: Date.now(),
      happ: {
        name: 'SF GeoChat',
        id: 1234
      },
      invoiceDetails: {
        start: '',
        end: '',
        bandwidth: {
          price: 1234, // hosting bandwidth prices hf/mb
          quantity: 1 // traffic serviced (should be in mb) - to calculate bandwidth,
        },
        compute: {
          price: 12,
          quantity: 234
        },
        storage: {
          price: 432
        }
      }
    },
    {
      id: 3,
      amount: 123456789.34,
      status: 'received',
      updatedAt: Date.now(),
      happ: {
        name: 'HC-Wiki',
        id: 12345
      },
      invoiceDetails: {
        start: '',
        end: '',
        bandwidth: {
          price: 1234, // hosting bandwidth prices hf/mb
          quantity: 1 // traffic serviced (should be in mb) - to calculate bandwidth,
        },
        compute: {
          price: 12,
          quantity: 234
        },
        storage: {
          price: 432
        }
      }
    },
    {
      id: 4,
      amount: 123456789888.34,
      status: 'received',
      updatedAt: Date.now(),
      happ: {
        name: 'HC-Wiki2',
        id: 1
      },
      invoiceDetails: {
        start: '',
        end: '',
        bandwidth: {
          price: 1234, // hosting bandwidth prices hf/mb
          quantity: 1 // traffic serviced (should be in mb) - to calculate bandwidth,
        },
        compute: {
          price: 12,
          quantity: 234
        },
        storage: {
          price: 432
        }
      }
    }
  ]
}

const userConfig = {
  admin: {
    public_key: 'bWuOwXKMboemNR6uthGfmqew1ZsVcz2IJXt1lp+ANWY',
    email: 'test@test.com'
  }
}

const coreAppVersion = {
  version: 'core-app:0_3_2_alpha0::ae3550d6-da94-44a6-a287-20d01a330c89'
}

const getMyProfile = {
  agent_address: {
    type: 'Buffer',
    data: [
      132, 32, 36, 157, 32, 140, 24, 241, 10, 28, 222, 179, 158, 62, 209, 80, 229, 227, 114, 241,
      62, 210, 166, 100, 55, 151, 238, 176, 36, 80, 111, 82, 43, 225, 83, 139, 240, 203, 176
    ]
  },
  nickname: 'My Nickname',
  avatar_url: null,
  uniqueness: {
    type: 'Buffer',
    data: [
      132, 33, 36, 157, 32, 140, 24, 241, 10, 28, 222, 179, 158, 62, 209, 80, 229, 227, 114, 241,
      62, 210, 166, 100, 55, 151, 238, 176, 36, 80, 111, 82, 43, 225, 83, 139, 240, 203, 176
    ]
  }
}

// NB: both /api and /holochain-api calls are mocked here
const data = {
  get: {
    '/api/v1/config': userConfig,
    '/holochain-api/v1/hosted_happs': happs,
    '/holochain-api/v1/usage': usage,
    '/holochain-api/v1/host_earnings': earnings,
    '/holochain-api/v1/core_app_version': coreAppVersion
  },
  put: {
    '/api/v1/config': (args) => args
  },
  post: {
    '/holochain-api/v1/zome_call': getMyProfile
  }
}

function defaultResponse(method, path, body) {
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

  throw new Error(`Unrecognized request: ${method}:${path}`)
}

module.exports = defaultResponse
