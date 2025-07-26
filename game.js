const {parseDiceArguments} = require ('./inputParser')
const {generateCommitment, verifyHMAC} = require ('./fairRandom')
const {showMenu} = require ('./menu')
const { compareValues, isValidUserIndex } = require('./utils')

const args = process.argv.slice(2)
let diceList
try {
    diceList = parseDiceArguments(args)
    console.log('Parsed dice: ', diceList)
} catch (err) {
    console.error('X', err)
    process.exit(1)
}

const computerIndex = Math.floor(Math.random() * diceList.length)
const computerDice = diceList[computerIndex]
const {hmac, key, number: computerRollIndex} = generateCommitment(6)
console.log(`HMAC: [Fairness and transparency proof]: ${hmac}`)

showMenu(diceList, computerIndex, (userInput) => {
    if (userInput.toLowerCase() === 'x') {
        console.log('Game exited.')
        return
    }

    if (!isValidUserIndex(userInput, diceList.length, computerIndex)) {
        console.log('\nInvalid Selection')
        return
    }

    const userIndex = parseInt(userInput)
    const userDice = diceList[userIndex]
    const userRollIndex = Math.floor(Math.random() * 6)

    console.log(`\nComputer chose Dice ${computerIndex}: [${computerDice.join(', ')}]`)
    console.log(`You chose Dice ${userIndex}: [${userDice.join(', ')}]`)

    const computerValue = computerDice[computerRollIndex]
    const userValue = userDice[userRollIndex]

    console.log(`Computer rolled: ${computerValue}`)
    console.log(`You rolled: ${userValue}`)

    const winner = compareValues(userValue, computerValue)
    if (winner === 'user') {
        console.log('You win!')
    } else if (winner === 'computer') {
        console.log('Computer wins!')
    } else {
        console.log(`It's a draw!`)
    }

    const valid = verifyHMAC(computerRollIndex, key, hmac)
    console.log(valid ? '(HMAC matched)' : 'Fairness check failed', hmac)
})
