import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = [
    'GET /api/v2/soknader',
    'GET /api/v2/soknader/[uuid]/mottaker',
    'POST /api/v2/opprettSoknadUtland',
    'POST /api/v2/soknader/[uuid]/avbryt',
    'POST /api/v2/soknader/[uuid]/send',
    'POST /api/v2/soknader/[uuid]/korriger',
    'POST /api/v2/soknader/[uuid]/gjenapne',
    'POST /api/v2/soknader/[uuid]/ettersendTilNav',
    'POST /api/v2/soknader/[uuid]/ettersendTilArbeidsgiver',
    'PUT /api/v2/soknader/[uuid]/sporsmal/[uuid]',
    'POST /api/v2/soknader/[uuid]/sporsmal/[uuid]/svar',
    'DELETE /api/v2/soknader/[uuid]/sporsmal/[uuid]/svar/[uuid]',
]

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'sykepengesoknad-backend',
        backendHostname: 'sykepengesoknad-backend',
        backendClientId: serverRuntimeConfig.sykepengesoknadBackendClientId,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
