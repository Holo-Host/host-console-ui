const stringify = require('fast-json-stable-stringify')
const sha512 = require('js-sha512')
const { isEmpty } = require('lodash')

// there's some duplication between this file and src/utils/keyManagement.js

const signPayload = (keypair, method, request, body) => {
  let bodyHash

  if (body && !isEmpty(body)) {
    bodyHash = hashString(stringify(body))
  }

  const payload = { method: method.toLowerCase(), request, body: bodyHash || '' }

  try {
    const signature = keypair.sign(payload)
    
    return signature
  } catch (error) {
    throw (error)
  }
}

const hashString = string => {
  return Buffer.from(sha512.arrayBuffer(string)).toString('base64')
}

module.exports = {
  signPayload,
  hashString
}
