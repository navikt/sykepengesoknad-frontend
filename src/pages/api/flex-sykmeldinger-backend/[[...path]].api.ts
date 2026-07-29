import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { getServerEnv } from '../../../utils/env'

const tillatteApier = ['GET /api/v1/sykmeldinger']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    await proxyKallTilBackend({
        req: req,
        res: res,
        tillatteApier: tillatteApier,
        backend: 'flex-sykmeldinger-backend',
        hostname: 'flex-sykmeldinger-backend.flex',
        backendClientId: getServerEnv().SYKMELDINGER_BACKEND_CLIENT_ID,
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
