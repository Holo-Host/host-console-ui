// mock of normal hpos api responses
const dayjs = require('dayjs')

const kMsInSecond = 1000

const happs = [
  {
    id: '1',
    name: 'HoloFuel',
    enabled: true,
    isPaused: true,
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
    isPaused: false,
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
    isPaused: false,
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

function createDate(year, month, day) {
  return dayjs(`${year}-${month}-${day}`).valueOf() * kMsInSecond
}

/* eslint-disable no-magic-numbers */
const mockPaidInvoicesData = [
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6H',
    amount: '1234567',
    created_date: createDate(2022, 9, 20),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k2EkZzuUESiw03zuRYoPh05vswcLsi566MC-Nxqtuc',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAA',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6I',
    amount: '1224567',
    created_date: createDate(2022, 9, 21),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 27)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6J',
    amount: '123469.89',
    created_date: createDate(2022, 9, 20),
    completed_date: createDate(2022, 9, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:ABA',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 27)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6K',
    amount: '1234565.89',
    created_date: createDate(2022, 9, 25),
    completed_date: createDate(2022, 9, 26),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proof_of_service_token: null,
    url: null,
    expiration_date: 1663999999999999
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6L',
    amount: '134561.89',
    created_date: createDate(2022, 8, 20),
    completed_date: createDate(2022, 8, 23),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 8, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6M',
    amount: '1234563.89',
    created_date: createDate(2022, 8, 28),
    completed_date: createDate(2022, 8, 30),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 8, 30)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6N',
    amount: '124561.93',
    created_date: createDate(2022, 9, 28),
    completed_date: createDate(2022, 9, 29),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 30)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6O',
    amount: '1234568.89',
    created_date: createDate(2022, 9, 1),
    completed_date: createDate(2022, 9, 3),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 25)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6P',
    amount: '1234568.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 5)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6R',
    amount: '2234569.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 9)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6S',
    amount: '234563.89',
    created_date: createDate(2022, 9, 3),
    completed_date: createDate(2022, 9, 4),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 10)
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6T',
    amount: '1234565.89',
    created_date: createDate(2022, 9, 7),
    completed_date: createDate(2022, 9, 9),
    transaction_type: { Request: null },
    counterparty: 'uhCAki0d39_k9ZzuUESiw09zuRYoPh05vswcLsi566MC-Nxqtuz',
    direction: { Outgoing: null },
    status: { Completed: null },
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAB',
    proof_of_service_token: null,
    url: null,
    expiration_date: createDate(2022, 9, 11)
  }
]

const mockUnpaidInvoicesData = {
  invoice_pending: [
    {
      id: 'uhCEk8JMlpIf-ITDT7uND_zvyGG2hp6VhnYzG6WUpwOxF6ya8105V',
      amount: '3.23',
      created_date: createDate(2022, 9, 7),
      completed_date: null,
      transaction_type: { Request: null },
      counterparty: 'uhCAkDOc0jde0SS4CO3HRThx5_cee2Nm_w-T30bTNE-uLmMoOoZzX',
      direction: { Outgoing: null },
      status: { Pending: null },
      note: 'Holo Hosting Invoice <last 5 char of hha_id>: <hApp_name>',
      proof_of_service_token: null,
      url: null,
      expiration_date: createDate(2022, 9, 11)
    }
  ],
  promise_pending: [
    {
      id: 'uhCEkoQQJ2Ksp_FcqEnatDYBLFQzzWzStQdXE5SDDI4a2rqZyh7ik',
      amount: '1.23',
      created_date: 1663688288964525,
      completed_date: null,
      transaction_type: { Offer: null },
      counterparty: 'uhCAkDOc0jde0SS4CO3HRThx5_cee2Nm_w-T30bTNE-uLmMoOoZzX',
      direction: { Outgoing: null },
      status: { Pending: null },
      note: 'Holo Hosting Invoice <last 5 char of hha_id>: <hApp_name>',
      proof_of_service_token: null,
      url: null,
      expiration_date: 9007199254740991
    }
  ],
  invoice_declined: [],
  promise_declined: [],
  accepted: []
}

const holoNixpkgs = {
  holo_nixpkgs: {
    channel: {
      name: 'develop',
      rev: '26a12619249c0ab0db7c0d9c98709386cfd991b0'
    },
    current_system: {
      rev: 'bc34eaa633a0b6483a97b86dd25811697220574d'
    }
  },
  holoport: {
    name: 'my Holoport'
  }
}

// NB: both /api and /holochain-api calls are mocked here
const data = {
  get: {
    '/api/v1/config': userConfig,
    '/api/v1/status': holoNixpkgs,
    '/holochain-api/v1/hosted_happs': happs,
    '/holochain-api/v1/usage': usage,
    '/holochain-api/v1/host_earnings': earnings,
    '/holochain-api/v1/core_app_version': coreAppVersion
  },
  put: {
    '/api/v1/config': (args) => args,
    '/api/v1/holoport/name': {}
  },
  post: {
    '/holochain-api/v1/zome_call': (args) => {
      switch (args.fnName) {
        case 'get_my_profile':
          return getMyProfile
        case 'get_completed_transactions':
          return mockPaidInvoicesData
        case 'get_pending_transactions':
          return mockUnpaidInvoicesData
      }
    }
  }
}

function defaultResponse(method, path, body) {
  const pathsForMethod = data[method]

  if (pathsForMethod) {
    const response = pathsForMethod[path]

    if (response) {
      if (typeof response === 'function') {
        return response(body)
      } else {
        return response
      }
    }
  }

  throw new Error(`Unrecognized request: ${method}:${path}`)
}

module.exports = defaultResponse
exports.mockPaidInvoicesData = mockPaidInvoicesData
exports.mockUnpaidInvoicesData = mockUnpaidInvoicesData
