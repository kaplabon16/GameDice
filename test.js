const {parseDiceArguments} = require('./inputParser')
try {
    const dice = parseDiceArguments (['2,1,4,2,5,6', '3,2,1,1,3,5', '1,1,3,4,5,2'])
    console.log(dice)
}
catch (err){
    console.error("Inavlid", err.message)
}