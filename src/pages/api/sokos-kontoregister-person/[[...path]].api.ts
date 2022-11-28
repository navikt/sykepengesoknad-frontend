import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'
import { hentTestperson } from '../../../data/mock/testperson'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['GET /api/borger/v1/hent-aktiv-konto']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        const testperson = hentTestperson(req.url)
        if (testperson && testperson.kontonummer) {
            res.json({ kontonummer: testperson.kontonummer })
            res.end()
            return
        }

        res.status(404)
        res.end()
        return
    }

    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'sokos-kontoregister-person',
        hostname: 'sokos-kontoregister-person.okonomi',
        backendClientId: serverRuntimeConfig.sokosKontoregisterPersonClientId,
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
