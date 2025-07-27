let diceList = []

function setDiceList(list) {
  diceList = list
}

function getDice(index) {
  if (index < 0 || index >= diceList.length) {
    throw new Error(`Invalid dice index: ${index}`)
  }
  return diceList[index]
}

function rollDice(diceIndex, faceIndex) {
  const d = getDice(diceIndex)
  if (faceIndex < 0 || faceIndex >= d.length) {
    throw new Error(`Invalid face index: ${faceIndex}`)
  }
  return d[faceIndex]
}

function getAllDice() {
  return diceList
}

module.exports = { setDiceList, getDice, rollDice, getAllDice }
