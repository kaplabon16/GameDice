function parseDiceArguments (args) {
    if (args.length < 3) {
        throw new Error (`At least 3 dice/strings should be provided!`)
    }
    const diceList =args.map((arg, index) => {
        const parts = arg.split(',')
        if (parts.length !== 6) {
            throw new Error (`Must have at least 6 sides of a dice. You have provided ${parts.length} sides.`)
        }
        const numbers = parts.map ((string, i) => {
            const num = Number(string)
            if (isNaN(num) || !Number.isInteger(num)) {
                throw new Error(`Dice ${index} has invalid value at position ${i}: ${string}`);
            }
            return num
        })
        return numbers
    })
    return diceList
}
module.exports = {parseDiceArguments}

