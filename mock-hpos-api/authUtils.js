const signPayload = async (keypair, method, request, body) => {
  let bodyHash

  if (body) {
    bodyHash = await hashString(stringify(body))
  }

  const payload = { method: method.toLowerCase(), request, body: bodyHash || '' }

  try {
    const signature = keypair.sign(payload)

    return signature
  } catch (error) {
    throw (error)
  }
}

const hashString = async (string) => {
  const dataBytes = Buffer.from(string)
  const hashBytes = await crypto.subtle.digest('SHA-512', dataBytes)

  return Buffer.from(hashBytes).toString('base64')
}

module.exports = {
  signPayload
}