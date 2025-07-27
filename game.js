const { parseDiceArguments } = require('./inputParser')
const { setDiceList, rollDice } = require('./dice')
const { generateCommitment, verifyHMAC } = require('./fairRandom')
const { showHelpTable } = require('./helpTable')
const { compareValues, isValidUserIndex } = require('./utils')
const readline = require('readline')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
function prompt(question) {
  return new Promise(resolve => rl.question(question, answer => resolve(answer)))
}

async function determineFirstPlayer() {
  const { hmac, number, key } = generateCommitment(2)
  console.log(`I selected 0..1 (HMAC=${hmac})`)
  while (true) {
    const ans = (await prompt('Guess 0 or 1 (X=exit, ?=help): ')).trim().toUpperCase()
    if (ans === 'X') process.exit(0)
    if (ans === '?') { showHelpTable(); continue }
    if (ans === '0' || ans === '1') {
      console.log(`I reveal: ${number} (KEY=${key})`)
      return Number(ans) === number
    }
    console.log('Invalid choice, please try again.')
  }
}

async function rollPhase(playerName, diceIdx) {
  const size = diceList[diceIdx].length
  const { hmac, number, key } = generateCommitment(size)
  console.log(`[${playerName}] Commitment HMAC=${hmac}`)
  let userChoice
  while (true) {
    const ans = (await prompt(`Enter 0..${size - 1} (X=exit, ?=help): `)).trim().toUpperCase()
    if (ans === 'X') process.exit(0)
    if (ans === '?') { showHelpTable(); continue }
    if (/^\d+$/.test(ans) && Number(ans) < size) {
      userChoice = Number(ans)
      break
    }
    console.log('Invalid input, please try again.')
  }
  console.log(`${playerName} reveal: number=${number}, key=${key}`)
  console.log(verifyHMAC(number, key, hmac) ? 'PASS' : 'FAIL')
  const resultIdx = (number + userChoice) % size
  const face = rollDice(diceIdx, resultIdx)
  console.log(`${playerName} rolled face index ${resultIdx} ⇒ ${face}`)
  return face
}

async function main() {
  const args = process.argv.slice(2)
  try {
    const parsed = parseDiceArguments(args)
    setDiceList(parsed)
    diceList = parsed
    console.log('Parsed dice:', diceList)
  } catch (err) {
    console.error('X', err.message)
    process.exit(1)
  }

  const userFirst = await determineFirstPlayer()
  console.log(userFirst ? 'You go first.' : 'Computer goes first.')

  // User selects dice
  while (true) {
    console.log('Select your dice:')
    diceList.forEach((d, i) => console.log(`${i}: [${d.join(', ')}]`))
    const input = (await prompt('Your choice (X=exit, ?=help): ')).trim().toUpperCase()
    if (input === 'X') process.exit(0)
    if (input === '?') { showHelpTable(); continue }
    if (isValidUserIndex(input, diceList.length, -1)) {
      userDiceIdx = Number(input)
      break
    }
    console.log('Invalid selection, please try again.')
  }
  const compDiceIdx = diceList.findIndex((_, i) => i !== userDiceIdx)

  const first = userFirst ? ['User', userDiceIdx] : ['Computer', compDiceIdx]
  const second = userFirst ? ['Computer', compDiceIdx] : ['User', userDiceIdx]

  const firstFace = await rollPhase(first[0], first[1])
  const secondFace = await rollPhase(second[0], second[1])

  console.log()
  const result = compareValues(
    first[0] === 'User' ? firstFace : secondFace,
    first[0] === 'User' ? secondFace : firstFace
  )
  if (result === 'user') console.log('You win!')
  else if (result === 'computer') console.log('Computer wins!')
  else console.log("It's a draw!")

  rl.close()
}

let diceList, userDiceIdx
main()
