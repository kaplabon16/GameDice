const readline = require('readline')
const { showHelpTable } = require('./helpTable')

function showMenu(diceList, forbiddenIndex, callback) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  function ask() {
    console.log('\nAvailable dice:')
    diceList.forEach((d, i) => {
      if (i !== forbiddenIndex) console.log(` ${i}: [${d.join(', ')}]`)
    })
    console.log(' ?: show help table')
    console.log(' X: exit')
    rl.question('Your choice: ', ans => {
      const c = ans.trim().toUpperCase()
      if (c === 'X') {
        rl.close()
        return
      }
      if (c === '?') {
        showHelpTable()
        return ask()
      }
      rl.close()
      callback(ans.trim())
    })
  }
  ask()
}

module.exports = { showMenu }
