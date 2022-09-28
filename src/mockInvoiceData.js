import dayjs from 'dayjs'

const kMsInSecond = 1000

export function createDate(year, month, day) {
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

export default mockPaidInvoicesData

/* eslint-enable no-magic-numbers */
