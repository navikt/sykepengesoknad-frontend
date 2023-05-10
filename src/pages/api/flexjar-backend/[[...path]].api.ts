import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['POST /api/v1/feedback']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        res.status(202)
        res.end()
        return
    }
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'flexjar-backend',
        hostname: 'flexjar-backend',
        backendClientId: serverRuntimeConfig.flexjarBackendClientId,
        https: false,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
