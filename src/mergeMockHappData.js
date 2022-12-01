// This is temporary for version 0.1.0 to provide data that will come from hpos, service logger and holofuel in later versions.

const mockHappData = {
  id: '-- ',
  hostedDays: '-- ',
  earnings: '-- ',
  sevenDayEarnings: '-- ',
  description: '',
  hostedAgents: '-- ',
  usage: {
    cpu: '-- ',
    bandwidth: '-- ',
    storage: '-- '
  }
}

export default function mergeMockHappData(happ, i) {
  return {
    ...mockHappData,
    id: i,
    ...happ
  }
}
