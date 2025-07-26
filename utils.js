function isValidUserIndex(input, diceCount, computerIndex) {
  const index = parseInt(input)
  return (
    !isNaN(index) &&
    index >= 0 &&
    index < diceCount &&
    index !== computerIndex
  )
}

function compareValues(userValue, computerValue) {
  if (userValue > computerValue) return 'user'
  if (computerValue > userValue) return 'computer'
  return 'draw'
}

module.exports = {
  isValidUserIndex,
  compareValues
}
