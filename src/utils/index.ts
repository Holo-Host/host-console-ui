export const presentHolofuelAmount = (amount: number): string =>
  isNaN(amount) ? '-- ' : Number(amount).toLocaleString()

export const presentShortHolofuelAmount = (amount: number): string =>
  isNaN(amount) ? '-- ' : Math.floor(Number(amount)).toLocaleString()

export const presentBytes = (bytes: number): string => {
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

export const presentMicroSeconds = (ms: number): string => {
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
export const presentPublisherHash = (hash: string): string => `...${hash.slice(-5)}`

// Create random string with 128 bit entropy
// String has to be url safe because token is passed in url as query param
export const generateToken = (): string => {
  const entropy = 128 // entropy 2^128
  const randomArrayBuffer = crypto.getRandomValues(new Uint8Array(entropy))
  const base64String = btoa(String.fromCharCode(...new Uint8Array(randomArrayBuffer)))
  return base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
