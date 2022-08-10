import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { tokenXProxy } from '../../../auth/tokenXProxy'

const { serverRuntimeConfig } = getConfig()

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const soknader = await tokenXProxy({
            url: 'http://sykepengesoknad-backend/api/v2/opprettSoknadUtland',
            method: 'POST',
            req: req,
            noResponse: false,
            clientId: serverRuntimeConfig.sykepengesoknadBackendClientId,
        })

        res.status(200).send(soknader)
    }
)

export default handler
