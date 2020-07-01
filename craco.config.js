// eslint-disable-next-line @typescript-eslint/no-var-requires
const CracoLessPlugin = require('craco-less')

module.exports = {
    webpack: {
        configure: {
            devtool: 'hidden-source-map'
        },
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    sourceMap: true
                }
            }
        },
    ],
}
