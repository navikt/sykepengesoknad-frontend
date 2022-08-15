import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { getTokenxToken } from '../../../auth/getTokenxToken'
import { logger } from '../../../utils/logger'

const proxy = httpProxy.createProxyServer()
const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['GET /api/v2/soknader']

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const path = req.url!.replace('/sykepengesoknad-backend', '')
        const api = `${req.method} ${path}`
        if (!tillatteApier.includes(api)) {
            logger.warn('404 Ukjent api: ' + api)
            res.status(404)
            res.send(null)
            return
        }
        req.url = path

        const idportenToken = req.headers.authorization!.split(' ')[1]
        const tokenxToken = await getTokenxToken(
            idportenToken,
            serverRuntimeConfig.sykepengesoknadBackendClientId
        )

        req.headers['Authorization'] = `Bearer ${tokenxToken}`

        proxy.web(req, res, {
            target: 'http://sykepengesoknad-backend',
            changeOrigin: true,
        })
    }
)

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
