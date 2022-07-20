import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { tokenXProxy } from '../../../auth/tokenXProxy'

const { serverRuntimeConfig } = getConfig()

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const sykmeldinger = await tokenXProxy({
            url: 'http://sykepengesoknad-backend/api/v2/soknader',
            method: 'GET',
            req: req,
            clientId: serverRuntimeConfig.sykepengesoknadBackendClientId,
        })

        res.status(200).json(sykmeldinger)
    }
)

export default handler
