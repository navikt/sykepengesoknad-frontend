import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'

const tillatteApier = ['POST /api/v1/emotion']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        res.status(201)
        res.end()
        return
    }
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'flex-hotjar-emotions',
        hostname: 'flex-hotjar-emotions',
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
