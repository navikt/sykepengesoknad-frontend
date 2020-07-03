/* eslint-disable */

const fs = require('fs')
const sourceMap = require('source-map')


// Last ned sources with sourcemaps fra GHA
const sourcemap = './sources-with-sourcemaps/js/2.65948334.chunk.js.map' // Bytt ut her

new sourceMap.SourceMapConsumer(fs.readFileSync(sourcemap, 'utf8'))
    .then(c => {
            console.log(c.originalPositionFor({
                line: 2, // Bytt ut her
                column: 853309 // Bytt ut her
            }))
        }
    )


/* eslint-enable */
