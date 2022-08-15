import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { getTokenxToken } from '../../../auth/getTokenxToken'

const proxy = httpProxy.createProxyServer()
const { serverRuntimeConfig } = getConfig()

proxy.on('proxyReq', async function (proxyReq, req, res, options) {
    const idportenToken = req.headers.authorization!.split(' ')[1]
    proxyReq.removeHeader('Authorization')

    const tokenxToken = await getTokenxToken(
        idportenToken,
        serverRuntimeConfig.flexBucketUploaderClientId
    )
    proxyReq.setHeader('Authorization', `Bearer ${tokenxToken}`)

    const rewritedPath = req.url!.replace('/flex-bucket-uploader', '/')
    proxyReq.path = rewritedPath
})

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        proxy.web(req, res, {
            target: 'http://flex-bucket-uploader',
            changeOrigin: true,
        })
    }
)

export const config = {
    api: {
        bodyParser: false,
    },
}

export default handler
