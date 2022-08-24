export const presentHolofuelAmount = amount => isNaN(amount)
  ? '-- '
  : Number(amount).toLocaleString()

export const presentShortHolofuelAmount = amount => isNaN(amount)
  ? '-- '
  : Math.floor(Number(amount)).toLocaleString()

export const presentBytes = bytes => {
  if (isNaN(bytes)) {
    return '-- GB'
  }

  if (bytes === 0) {
    return '0 GB'
  }

  const k = 1024;
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB'];

  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), 4);

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const presentMicroSeconds = ms => {
  if (isNaN(ms)) {
    return '-- ms'
  }

  if (ms === 0) {
    return '0 ms'
  }

  const k = 1000;
  const sizes = ['μs', 'ms', 's'];

  const i = Math.min(Math.floor(Math.log(ms) / Math.log(k)), 2);

  return parseFloat((ms / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export const presentPublisherHash = hash => `...${hash.slice(-5)}`

export const generateToken = () => {
  const wasm = import('@holo-host/hp-admin-keypair')//crypto-random-string

  return cryptoRandomString({length: 43, type: 'base64'}) // entorpy 2^258
}
