import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'

import { getTokenxToken } from '../auth/getTokenxToken'
import { cleanPathForMetric } from '../metrics'
import { logger } from '../utils/logger'

interface Opts {
    req: NextApiRequest
    res: NextApiResponse
    tillatteApier: String[]
    backend: string
    backendUrl: string
    backendClientId: string
}

export async function proxyKallTilBackend(opts: Opts) {
    const rewritedPath = opts.req.url!.replace('/' + opts.backend, '')
    const api = `${opts.req.method} ${rewritedPath}`
    if (!opts.tillatteApier.includes(<String>cleanPathForMetric(api))) {
        logger.warn('404 Ukjent api: ' + api)
        opts.res.status(404)
        opts.res.send(null)
        return
    }

    const idportenToken = opts.req.headers.authorization!.split(' ')[1]
    const tokenxToken = await getTokenxToken(
        idportenToken,
        opts.backendClientId
    )

    const proxy = httpProxy.createProxyServer()
    proxy.on('proxyReq', (proxyReq, req, res, options) => {
        proxyReq.removeHeader('Authorization')
        proxyReq.setHeader('Authorization', `Bearer ${tokenxToken}`)
        proxyReq.path = rewritedPath
    })
    proxy.web(opts.req, opts.res, {
        target: opts.backendUrl,
        changeOrigin: true,
    })
}
