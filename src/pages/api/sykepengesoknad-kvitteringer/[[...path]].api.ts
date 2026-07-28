import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { getServerEnv } from '../../../utils/env'

const tillatteApier = ['GET /api/v2/kvittering/[uuid]', 'POST /api/v2/opplasting']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    await proxyKallTilBackend({
        req: req,
        res: res,
        tillatteApier: tillatteApier,
        backend: 'sykepengesoknad-kvitteringer',
        hostname: 'sykepengesoknad-kvitteringer',
        backendClientId: getServerEnv().SYKEPENGESOKNAD_KVITTERINGER_CLIENT_ID,
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
