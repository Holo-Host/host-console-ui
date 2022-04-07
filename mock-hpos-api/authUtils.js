const stringify = require('fast-json-stable-stringify')
const sha512 = require('js-sha512')

// there's some duplication between this file and src/utils/keyManagement.js

const verifySignedRequest = (givenSignature, method, pathIncludingQuery, body, keypair) => {
  // BUG: real server (hp-admin-crypto) does not properly check the body when
  //      verifying signature [1]. pass empty string so that it validates
  //      successfully
  //
  // [1]: https://github.com/Holo-Host/hp-admin-crypto/issues/25
  //
  // correct code:
  //
  // let body_to_sign = stringify(body)
  // if (body_to_sign === '{}') {
  //   body_to_sign = ''
  // }
  const body_to_sign = ''
  const payload = { method: method.toLowerCase(), request: pathIncludingQuery, body: body_to_sign }

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
