// mock of normal hpos api responses
const createDate = require('./utils')

/* eslint-disable no-magic-numbers */
const happs = [
  {
    id: '1',
    name: 'HoloFuel',
    enabled: true,
    isPaused: true,
    hostedAgents: 110,
    usage: {
      bandwidth: 349082,
      cpu: 49083408432,
      storage: 3902834
    }
  },
  {
    id: '2',
    name: 'Community',
    enabled: true,
    isPaused: false,
    hostedAgents: 79,
    usage: {
      bandwidth: 59084358,
      cpu: 83408432,
      storage: 709049842834
    }
  },
  {
    id: '3',
    name: 'Elemental Chat',
    enabled: true,
    isPaused: false,
    hostedAgents: 34,
    usage: {
      bandwidth: 98559083,
      cpu: 595430,
      storage: 50949882
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
  totalHostedAgents: 0,
  currentTotalStorage: 0,
  totalUsage: { cpu: 0, bandwidth: 0 }
}

const earnings = {
  earnings: { last30days: 1343209.4, last7days: 447768.54, lastday: 34209.4 },
  holofuel: { balance: '0', available: '0', redeemable: '2990348.42' },
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

const getAllReserveAccountsDetails = {
  reserve_id: 'QmYXJ5Y2FyZG9uLmNvbS9ob2xvZnVsb2c=',
  pub_key: 'uhCAkod6AkumAC8VNFgDHZsdpDBPBGPpPxt2QyxebjY6zfHGQCkSp',
  info: {
    external_reserve_currency: '',
    external_account_number: '',
    external_signing_key: '',
    default_promise_expiry: '',
    min_external_currency_tx_size: '',
    max_external_currency_tx_size: '',
    note: '',
  }
}

const redemptionTransaction = {
  id: 'dit7373ddjlg9204hfnfvu749506mvjshss7306mvjsd8',
  amount: 1000000,
  fee: 0,
  completed_date: createDate(1, 1),
  created_date: createDate(1, 1),
  transaction_type: '',
  counterparty: '',
  direction: '',
  status: '',
  note: '',
  proof_of_service: {
    redemption: '0x12345678...'
  },}

const mockHapps = [
  {
    id: 'ef48c978-3a34-42fc-a0b7-8ffa89f2bebb',
    name: 'CoreApp',
    enabled: true,
    isPaused: false,
    special_installed_app_id: coreAppVersion.version,
  }
]

const mockHosts = [
  {
    "host_pub_key": "uhCAkokIsoB0_NuY_GbL4_xmVlwoWvnJJcvRTOwFvAAU1iCrWE7ck",
    "holoport_id": "QuantumCoreServer",
    "preferences": {
      "timestamp": 1698953469075923,
      "max_fuel_before_invoice": "1",
      "price_compute": "75",
      "price_storage": "75",
      "price_bandwidth": "75",
      "max_time_before_invoice": {
        "secs": 18446744073709552000,
        "nanos": 999999999
      }
    },
    "preferences_hash": "uhCkkcbUz9JvKRn56E_c3IEaimnEYifLo2CbjavFrYYjYyqx05AI5"
  },
  {
    "host_pub_key": "uhCAkokIsoB0_NuY_GbK6_xmVlwoWvnJJcvRTOwFvAAU1iCrWE7ck",
    "holoport_id": "NimbusEdgeServer",
    "preferences": {
      "timestamp": 1698953469075923,
      "max_fuel_before_invoice": "1",
      "price_compute": "50",
      "price_storage": "50",
      "price_bandwidth": "50",
      "max_time_before_invoice": {
        "secs": 18446744073709552000,
        "nanos": 999999999
      }
    },
    "preferences_hash": "uhCkkcbUz9JvKRn56E_c3IEaimnEYifLo2CbjavFrYYjYyqx05AI5"
  },
  {
    "host_pub_key": "uhCAkokIsoB0_NuY_GbJ7_xmVlwoWvnJJcvRTOwFvAAU1iCrWE7ck",
    "holoport_id": "Happy PhoenixBlazeServer",
    "preferences": {
      "timestamp": 1698953469075923,
      "max_fuel_before_invoice": "1",
      "price_compute": "100",
      "price_storage": "100",
      "price_bandwidth": "100",
      "max_time_before_invoice": {
        "secs": 18446744073709552000,
        "nanos": 999999999
      }
    },
    "preferences_hash": "uhCkkcbUz9JvKRn56E_c3IEaimnEYifLo2CbjavFrYYjYyqx05AI5"
  },
  {
    "host_pub_key": "uhCAkokIsoB0_NuY_GbI8_xmVlwoWvnJJcvRTOwFvAAU1iCrWE7ck",
    "holoport_id": "ZenithPulseServer",
    "preferences": {
      "timestamp": 1698953469075923,
      "max_fuel_before_invoice": "1",
      "price_compute": "25",
      "price_storage": "25",
      "price_bandwidth": "25",
      "max_time_before_invoice": {
        "secs": 18446744073709552000,
        "nanos": 999999999
      }
    },
    "preferences_hash": "uhCkkcbUz9JvKRn56E_c3IEaimnEYifLo2CbjavFrYYjYyqx05AI5"
  },
  {
    "host_pub_key": "uhCAkokIsoB0_NuY_GbH9_xmVlwoWvnJJcvRTOwFvAAU1iCrWE7ck",
    "holoport_id": "NebulaSparkServer",
    "preferences": {
      "timestamp": 1698953469075923,
      "max_fuel_before_invoice": "1",
      "price_compute": "0",
      "price_storage": "0",
      "price_bandwidth": "0",
      "max_time_before_invoice": {
        "secs": 18446744073709552000,
        "nanos": 999999999
      }
    },
    "preferences_hash": "uhCkkcbUz9JvKRn56E_c3IEaimnEYifLo2CbjavFrYYjYyqx05AI5"
  }
]

const mockPaidInvoicesData = [
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6H',
    amount: '1234567',
    createdDate: createDate(5, -1),
    completedDate: createDate(1, -1),
    counterparty: 'uhCAkDOc0jde0SS4CO3HRThx5_cee2Nm_w-T30bTNE-uLmMoOoZzX',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bf6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFSPPQ==',
    url: null,
    happ: {
      name: 'Test Chat',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR6'
    },
    expirationDate: createDate(1, 1),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE6I',
    amount: '1224567',
    createdDate: createDate(4, -1),
    completedDate: createDate(2, -1),
    counterparty: 'jDCAki7J39_k2EkZzbUESiA03zuRYoPh05vQjcLWi566MC-NMqtuz',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:AAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bf6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFSjPQ==',
    url: null,
    happ: {
      name: 'AAA',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR7'
    },
    expirationDate: createDate(2, 2),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE61',
    amount: '1234565.89',
    createdDate: createDate(3, -1),
    completedDate: createDate(1, -1),
    counterparty: 'bhCAki0d39_k2EkZzuUESiw03zuRYoPh05vswcLsi566MC-Nxqtjz',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bf6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFSjjQ==',
    url: null,
    happ: {
      name: 'BAA',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR7ji'
    },
    expirationDate: createDate(2, 0),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE62',
    amount: '134561.89',
    createdDate: createDate(3, -2),
    completedDate: createDate(1, -1),
    counterparty: 'uhCAkUppepDnLMkfHsF787MDOAbX8KOmF2PytK7TnZnEdYfNUL-ro',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bf6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFShjQ==',
    url: null,
    happ: {
      name: 'BAA',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR7ji'
    },
    expirationDate: createDate(1, 0),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE63',
    amount: '1234563.89',
    createdDate: createDate(3, -2),
    completedDate: createDate(1, -1),
    counterparty: 'uhCAki0d39_k2EkZzuUEaiw03ruRYoGh05vswcLsi566MC-Nxqtj3',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bd6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFShj3==',
    url: null,
    happ: {
      name: 'BAB',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR7j3'
    },
    expirationDate: createDate(1, 0),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE64',
    amount: '1234.89',
    createdDate: createDate(1, 0),
    completedDate: createDate(1, 0),
    counterparty: 'uhCAki0d39_k2EkZzuUESiw93zuRYoPh05vswcLsi566MC-Nxqtj4',
    direction: 'Outgoing',
    status: 'Completed',
    note: 'Holo Hosting Invoice <last 5 char of hha_id>:BAA',
    proofOfServiceToken:
      'osT+WBHXMNm+HXtLO3x4Bf6JARASF5cJvA/ywwAYj6YO8UZtFjD3iZsr6iGkEHaIPuESAUdlthPT9KtqXFShj4==',
    url: null,
    happ: {
      name: 'BAB',
      id: 'uhCkk3BySOE9QOVcIa9OA6ClaPMJfnbjmdWGqhFQ6wFhk-FJrkUR7j4'
    },
    expirationDate: createDate(1, 1),
    type: 'Request',
    invoiceDetails: {
      start: 1666828474041950,
      end: 1666828475099560,
      service_logs_range: {
        quantity: 0,
        price: 0
      },
      bandwidth: {
        quantity: 0,
        price: 0
      },
      compute: {
        quantity: 0,
        price: 0
      },
      storage: {
        quantity: 0,
        price: 0
      }
    }
  }
]

const mockRedemptionHistoryData = [
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE63',
    createdDate: createDate(1, -1),
    requestedAmount: '1421002.0398',
    completedAmount: '1000000.00',
    redemptionAmount: '1000000.00',
    transactionId: '0xaf88712107800f829599a220ee6ac866c9b3cc9941fc0d3e6af3f8745f76155f',
    status: 'completed',
    isPartial: true,
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE64',
    createdDate: createDate(1, -2),
    requestedAmount: '1421002',
    completedAmount: '1421002',
    redemptionAmount: '1421002',
    transactionId: '0xaf88712107800f829599a220ee6ac866c9b3cc9941fc0d3e6af3f8745f76155f',
    status: 'completed',
    isPartial: false,
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE65',
    createdDate: createDate(0, -2),
    requestedAmount: '142100',
    completedAmount: '0',
    redemptionAmount: '0',
    transactionId: '',
    status: 'pending',
    isPartial: false,
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE66',
    createdDate: createDate(2, -2),
    requestedAmount: '2421002',
    completedAmount: '0',
    redemptionAmount: '0',
    transactionId: '',
    status: 'pending',
    isPartial: false,
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE67',
    createdDate: createDate(2, -2),
    requestedAmount: '3421002',
    completedAmount: '0',
    redemptionAmount: '0',
    transactionId: '',
    status: 'pending',
    isPartial: false,
  },
  {
    id: 'uhCEkuoMG0RpLkYciC3ZO2ZiedEhDq9yZJLrbjjVmNmXvjpvaAE68',
    createdDate: createDate(3, -2),
    requestedAmount: '4421002',
    completedAmount: '0',
    redemptionAmount: '0',
    transactionId: '',
    status: 'pending',
    isPartial: false,
  }
]

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

const mockKycData = {
  "kyc": 'holo_kyc_2'
}

let mockDefaultHappPreferences = {
  max_fuel_before_invoice: '1000',
  max_time_before_invoice: [2000, 500],
  price_bandwidth: (Math.random() * 10).toFixed(5).toString(),
  price_compute: (Math.random() * 10).toFixed(5).toString(),
  price_storage: (Math.random() * 10).toFixed(5).toString()
}

// NB: both /api and /holochain-api calls are mocked here
const data = {
  get: {
    '/api/v1/config': userConfig,
    '/api/v1/status': holoNixpkgs,
    '/api/v2/hosted_happs': happs,
    '/holochain-api/v1/get_happs': mockHapps,
    '/holochain-api/v1/get_hosts': mockHosts,
    '/holochain-api/v1/usage': usage,
    '/holochain-api/v1/host_earnings': earnings,
    '/holochain-api/v1/core_app_version': coreAppVersion,
    '/holochain-api/v1/host_invoices': mockPaidInvoicesData,
    '/holochain-api/v1/redemptions': mockRedemptionHistoryData,
    '/holochain-api/v1/kyc': mockKycData.kyc
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
        case 'get_all_reserve_accounts_details':
          return getAllReserveAccountsDetails
        case 'get_default_happ_preferences':
          return mockDefaultHappPreferences
        case 'set_default_happ_preferences':
          return true
        case 'redeem':
          return redemptionTransaction
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
/* eslint-enable no-magic-numbers */
