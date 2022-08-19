import * as http from 'http'
import { RequestOptions } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { Readable } from 'stream'

import { getTokenxToken } from '../auth/getTokenxToken'
import { cleanPathForMetric } from '../metrics'
import { logger } from '../utils/logger'
import { stream2buffer } from './stream2buffer'

interface Opts {
    req: NextApiRequest
    res: NextApiResponse
    tillatteApier: String[]
    backend: string
    backendHostname: string
    backendClientId: string
}

export async function proxyKallTilBackend(opts: Opts) {
    const rewritedPath = opts.req.url!.replace(`/api/${opts.backend}`, '')
    const api = `${opts.req.method} ${rewritedPath}`
    if (!opts.tillatteApier.includes(<String>cleanPathForMetric(api))) {
        logger.warn('404 Ukjent api: ' + api)
        opts.res.status(404)
        opts.res.send(null)
        return
    }

    const idportenToken = opts.req.headers.authorization!.split(' ')[1]
    const tokenxToken = await getTokenxToken(idportenToken, opts.backendClientId)

    const options: RequestOptions = {
        hostname: opts.backendHostname,
        port: 80,
        path: rewritedPath,
        method: opts.req.method,
        headers: {},
    }

    const headersToSkip = ['host', 'cookie', 'authorization']
    for (const headersKey in opts.req.headers) {
        if (!headersToSkip.includes(headersKey.toLowerCase())) {
            options.headers![headersKey] = opts.req.headers[headersKey]
        }
    }
    options.headers!['Authorization'] = `Bearer ${tokenxToken}`

    const stream = Readable.from(opts.req)
    const bodyin = await stream2buffer(stream)

    const backendRequest = http.request(options, (backendResponse) => {
        if (backendResponse.statusCode != null) {
            opts.res.status(backendResponse.statusCode)
        }
        for (const headersKey in backendResponse.headers) {
            opts.res.setHeader(headersKey, backendResponse.headers[headersKey]!)
        }

        backendResponse.on('data', (d: any) => {
            opts.res.write(d)
        })
        backendResponse.on('end', () => {
            opts.res.end()
        })
        stream.on('error', (err) =>
            logger.error(
                `Feil ved lesing av backend stream. Message: ${err.message}, Cause: ${err.cause}, URL: ${opts.req.url}`
            )
        )
    })

    backendRequest.write(bodyin)
    backendRequest.end()
}
