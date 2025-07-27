function isValidUserIndex(input, diceCount, forbiddenIndex) {
  const idx = parseInt(input, 10)
  return !isNaN(idx) && idx >= 0 && idx < diceCount && idx !== forbiddenIndex
}

function compareValues(userVal, compVal) {
  if (userVal > compVal) return 'user'
  if (compVal > userVal) return 'computer'
  return 'draw'
}

module.exports = { isValidUserIndex, compareValues }