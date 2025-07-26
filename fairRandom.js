const crypto = require ('crypto')

function generateCommitment (range) {
    const key = crypto.randomBytes(32)
    const number = crypto.randomInt(0, range-1)
    const hmac = crypto.createHmac('sha3-256', key)
    .update(String(number))
    .digest('hex')
    return {hmac, number, key}
}
function verifyHMAC (number, key, originalHMAC) {
    const calculated = crypto.createHmac('sha3-256', key)
    .update(String(number))
    .digest('hex')
    return calculated === originalHMAC
}
module.exports = {
    generateCommitment, verifyHMAC
}