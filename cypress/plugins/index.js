const cypressTypeScriptPreprocessor = require('./cy-ts-preprocessor')

module.exports = (on) => {
    on('file:preprocessor', cypressTypeScriptPreprocessor)

    on('task', {
        log(message) {
            console.log(message) // eslint-disable-line

            return null
        },
        table(message) {
            console.table(message) // eslint-disable-line

            return null
        },
    })
}
