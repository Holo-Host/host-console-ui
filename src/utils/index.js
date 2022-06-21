export const presentHolofuelAmount = (amount) =>
  isNaN(amount) ? '-- ' : Number(amount).toLocaleString()

export const presentShortHolofuelAmount = (amount) =>
  isNaN(amount) ? '-- ' : Math.floor(Number(amount)).toLocaleString()

export const presentBytes = (bytes) => {
  if (isNaN(bytes)) {
    return '-- GB'
  }

  if (bytes === 0) {
    return '0 GB'
  }

  const k = 1024
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB']

  // eslint-disable-next-line no-magic-numbers
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), 4)

  // eslint-disable-next-line no-magic-numbers
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export const presentMicroSeconds = (ms) => {
  if (isNaN(ms)) {
    return '-- ms'
  }

  if (ms === 0) {
    return '0 ms'
  }

  const k = 1000
  const sizes = ['μs', 'ms', 's']

  // eslint-disable-next-line no-magic-numbers
  const i = Math.min(Math.floor(Math.log(ms) / Math.log(k)), 2)

  // eslint-disable-next-line no-magic-numbers
  return `${parseFloat((ms / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

// eslint-disable-next-line no-magic-numbers
export const presentPublisherHash = (hash) => `...${hash.slice(-5)}`
