import moment from 'moment'

export const PSTATUS_PAID = 'Paid'
export const PSTATUS_UNPAID = 'Unpaid'
export const PSTATUS_LATE = 'Late'

export const ESTATUS_NA = 'n/a'
export const ESTATUS_EXCEPTION = 'Exception'
export const ESTATUS_REJECTED = 'Rejected'

const mockInvoiceData = [
  {
    id: '7ca96d311e',
    happ: 'Communities',
    publisher: 'uhCAkSZ36lo1RSJ4hbRDnHR4nf5AV5LsjHTO6g9geo6R7ujCr9FH8',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 234567.0964,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: 'cd956fb3be',
    happ: 'Communities',
    publisher: 'uhCAkSZ36lo1RSJ4hbRDnHR4nf5AV5LsjHTO6g9geo6R7ujCr9FH8',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 133456.0095,
    payment_status: PSTATUS_UNPAID,
    exception_status: ESTATUS_EXCEPTION
  },
  {
    id: 'fbd5967d92',
    happ: 'Communities',
    publisher: 'uhCAkSZ36lo1RSJ4hbRDnHR4nf5AV5LsjHTO6g9geo6R7ujCr9FH8',
    date_created: moment("2021-09-08"),
    date_due: moment("2021-10-08"),
    amount: 345554.3213,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '4a123c1d3b',
    happ: 'Communities',
    publisher: 'uhCAkSZ36lo1RSJ4hbRDnHR4nf5AV5LsjHTO6g9geo6R7ujCr9FH8',
    date_created: moment("2021-09-08"),
    date_due: moment("2021-10-08"),
    amount: 122347.8640,
    payment_status: PSTATUS_LATE,
    exception_status: ESTATUS_NA
  },
  {
    id: '3daa99dbad',
    happ: 'Communities',
    publisher: 'uhCAkSZ36lo1RSJ4hbRDnHR4nf5AV5LsjHTO6g9geo6R7ujCr9FH8',
    date_created: moment("2021-09-07"),
    date_due: moment("2021-10-07"),
    amount: 99234.3422,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: 'd9705d5842',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: 'e3af880fcf',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '3792ef4047',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '04019e1201',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '8776ad591f',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '9944402196',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '82f698f578',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '9e55f4298c',
    happ: 'HoloFuel',
    publisher: 'uhCAkBM6Ubf7qufeZa25o4hgcCCNMQQ1CzQlbSRRKEoG94zLhoYjq',
    date_created: moment("2021-09-12"),
    date_due: moment("2021-10-12"),
    amount: 344566.2344,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '650d60c833',
    happ: 'H-Wiki',
    publisher: 'uhCAknuUVuN5gzCE0su3efwTmErbVXObiCpx-9qMNF2Gji5pR96GX',
    date_created: moment("2021-09-07"),
    date_due: moment("2021-10-07"),
    amount: 89930.2224,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: '9715e2cac0',
    happ: 'H-Wiki',
    publisher: 'uhCAknuUVuN5gzCE0su3efwTmErbVXObiCpx-9qMNF2Gji5pR96GX',
    date_created: moment("2021-09-07"),
    date_due: moment("2021-10-07"),
    amount: 89930.2224,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  },
  {
    id: 'd62226ce39',
    happ: 'H-Wiki',
    publisher: 'uhCAknuUVuN5gzCE0su3efwTmErbVXObiCpx-9qMNF2Gji5pR96GX',
    date_created: moment("2021-09-07"),
    date_due: moment("2021-10-07"),
    amount: 89930.2224,
    payment_status: PSTATUS_PAID,
    exception_status: ESTATUS_NA
  }
]

export default mockInvoiceData
