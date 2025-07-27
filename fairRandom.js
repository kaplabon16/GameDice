const crypto = require('crypto')

function generateCommitment(range) {
  const key = crypto.randomBytes(32)
  const number = crypto.randomInt(0, range)
  const hmac = crypto
    .createHmac('sha3-256', key)
    .update(String(number))
    .digest('hex')
  return { hmac, number, key: key.toString('hex') }
}

function verifyHMAC(number, hexKey, originalHMAC) {
  const key = Buffer.from(hexKey, 'hex')
  const digest = crypto
    .createHmac('sha3-256', key)
    .update(String(number))
    .digest('hex')
  return digest === originalHMAC
}

module.exports = { generateCommitment, verifyHMAC }
