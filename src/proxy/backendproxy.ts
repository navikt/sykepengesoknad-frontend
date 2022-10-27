import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'

import { getTokenxToken } from '../auth/getTokenxToken'
import { cleanPathForMetric } from '../metrics'

interface Opts {
    req: NextApiRequest
    res: NextApiResponse
    tillatteApier: string[]
    backend: string
    hostname: string
    backendClientId: string
    https: boolean
}

export async function proxyKallTilBackend(opts: Opts) {
    const rewritedPath = opts.req.url!.replace(`/api/${opts.backend}`, '')
    const api = `${opts.req.method} ${rewritedPath}`
    if (!opts.tillatteApier.includes(<string>cleanPathForMetric(api))) {
        logger.warn('404 Ukjent api: ' + api)
        opts.res.status(404)
        opts.res.send(null)
        return
    }

    const idportenToken = opts.req.headers.authorization!.split(' ')[1]
    const tokenxToken = await getTokenxToken(idportenToken, opts.backendClientId)

    await proxyApiRouteRequest({ ...opts, path: rewritedPath, bearerToken: tokenxToken! })
}
