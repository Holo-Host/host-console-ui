const stringify = require('fast-json-stable-stringify')
const sha512 = require('js-sha512')

// there's some duplication between this file and src/utils/keyManagement.js

const verifySignedRequest = (givenSignature, payload, keypair) => {
  const expectedSignature = keypair.sign(payload)
  const valid = givenSignature === expectedSignature
  if (!valid) {
    console.log('Invalid signature. Signed Payload:', payload, 'Expected Signature', expectedSignature, 'Given Signature', givenSignature)
  }
  return valid
}

const hashString = string => {
  return Buffer.from(sha512.arrayBuffer(string)).toString('base64')
}

module.exports = {
  verifySignedRequest,
  hashString
}
