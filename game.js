const {parseDiceArguments} = require ('./inputParser')

try {
    const args = process.argv.slice(2)
    const diceList= parseDiceArguments(args)
    console.log('Parsed dice: ', diceList) 
}
catch (err) {
    console.error('X', err)

}