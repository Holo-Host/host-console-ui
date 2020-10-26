// This is temporary for version 0.1.0 to provide data that will come from hpos, service logger and holofuel in later versions.

const mockHappData = [{
  id: 1,
  hostedDays: 34,
  earnings: 3950615,
  sevenDayEarnings: 832120,
  description: "hApp to make you more productive",
  sourceChains: 497,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 2,
  hostedDays: 34,
  earnings: 3950615,
  sevenDayEarnings: 476005,
  description: "hApp to make you more productive",
  sourceChains: 497,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 3,
  hostedDays: 34,
  earnings: 3950615,
  sevenDayEarnings: 10302,
  description: "hApp to make you more productive",
  sourceChains: 497,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}]

export default function mergeMockHappData (happ) {
  const mockData = mockHappData.find(mh => mh.id === happ.id) || {}
  return {
    ...happ,
    ...mockData
  }
}
