import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../../../auth/beskyttetApi'
import { tokenXProxy } from '../../../../../auth/tokenXProxy'

const { serverRuntimeConfig } = getConfig()

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const id = req.query.id as string

        const response = await tokenXProxy({
            url: `http://sykepengesoknad-backend/api/v2/soknader/${id}/finnMottaker`,
            method: 'POST',
            req: req,
            clientId: serverRuntimeConfig.sykepengesoknadBackendClientId,
        })

        res.status(200).send(response)
    }
)

export default handler
