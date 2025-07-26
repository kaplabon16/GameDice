const readline = require('readline')

function showMenu(diceList, computerIndex, callback) {
    console.log('\nAvailable Dice:')
    diceList.forEach((dice, i) => {
        if (i !== computerIndex) {
            console.log(`Dice ${i}: [${dice.join(', ')}]`)
        }
    })

    console.log('\nOptions:')
    console.log('Enter the dice number to choose')
    console.log('? - Show probability table')
    console.log('X - Exit the game\n')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    function askAgain() {
        rl.question('Pick your dice: ', (answer) => {
            const input = answer.trim().toLowerCase()

            if (input === '?') {
                printProbabilityTable(diceList, computerIndex)
                askAgain() // Ask again after showing table
            } else {
                rl.close()
                callback(answer)
            }
        })
    }

    askAgain()
}

function printProbabilityTable(diceList, computerIndex) {
    const computerDice = diceList[computerIndex]
    console.log('\nProbability Table (Chance to Beat Computer Dice):')
    diceList.forEach((dice, i) => {
        if (i !== computerIndex) {
            const winRate = calculateWinRate(dice, computerDice)
            console.log(`Your Dice ${i} vs Computer Dice ${computerIndex} → Win Chance: ${winRate}%`)
        }
    })
}

function calculateWinRate(userDice, computerDice) {
    let wins = 0
    const total = userDice.length * computerDice.length
    for (let u of userDice) {
        for (let c of computerDice) {
            if (u > c) wins++
        }
    }
    return ((wins / total) * 100).toFixed(2)
}

module.exports = { showMenu }
