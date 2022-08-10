import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { tokenXProxy } from '../../../auth/tokenXProxy'

const { serverRuntimeConfig } = getConfig()

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        const sykmeldinger = await tokenXProxy({
            url: 'http://sykmeldinger-backend.teamsykmelding/api/v2/sykmeldinger',
            method: 'GET',
            req: req,
            clientId: serverRuntimeConfig.sykmeldingerBackendClientId,
        })

        res.status(200).json(sykmeldinger)
    }
)

export default handler
