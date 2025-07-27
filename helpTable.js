const { getAllDice } = require('./dice')

function computeWinRate(a, b) {
  let wins = 0
  for (const x of a) {
    for (const y of b) {
      if (x > y) wins++
    }
  }
  return (wins / (a.length * b.length) * 100).toFixed(2) + '%'
}

function showHelpTable() {
  const dice = getAllDice()
  const header = ['   '].concat(dice.map((_, i) => `D${i}`))
  const rows = dice.map((dA, i) => {
    return ['D' + i].concat(
      dice.map((dB, j) => (i === j ? '  - ' : computeWinRate(dA, dB).padStart(4)))
    )
  })
  const widths = header.map((h, k) =>
    Math.max(h.length, ...rows.map(r => r[k].length))
  )
  console.log(header.map((h, i) => h.padStart(widths[i])).join(' | '))
  console.log(widths.map(w => '-'.repeat(w)).join('-|-'))
  for (const r of rows) {
    console.log(r.map((c, i) => c.padStart(widths[i])).join(' | '))
  }
}

module.exports = { showHelpTable }