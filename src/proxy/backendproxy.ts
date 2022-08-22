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

    const backendReq = http.request(options, (res2) => {
        if (res2.statusCode != null) {
            opts.res.status(res2.statusCode)
        }
        for (const headersKey in res2.headers) {
            opts.res.setHeader(headersKey, res2.headers[headersKey]!)
        }

        res2.on('data', (d: any) => {
            opts.res.write(d)
        })
        res2.on('end', (d: any) => {
            opts.res.end()
        })
    })

    backendReq.write(bodyin)
    backendReq.end()
}
