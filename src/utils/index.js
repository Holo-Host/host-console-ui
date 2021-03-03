export const formatHolofuelAmount = amount => isNaN(amount) 
  ? '-- ' 
  : Number(amount).toLocaleString()

export const presentBytes = bytes => {
  if (isNaN(bytes)) {
    return '-- GB'
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

  const k = 1000;
  const sizes = ['μs', 'ms', 's'];

  const i = Math.min(Math.floor(Math.log(ms) / Math.log(k)), 2);

  return parseFloat((ms / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
