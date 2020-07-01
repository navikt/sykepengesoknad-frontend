/* eslint-disable */

const fs = require('fs')
const sourceMap = require('source-map')


const biblioteker = './build/static/js/2.63f0e1bf.chunk.js.map'
const main = './build/static/js/main.bf7fab64.chunk.js.map'

new sourceMap.SourceMapConsumer(fs.readFileSync(biblioteker, 'utf8'))
    .then(c => {
            console.log(c.originalPositionFor({
                line: 2,
                column: 853309
            }))
        }
    )


/* eslint-enable */
