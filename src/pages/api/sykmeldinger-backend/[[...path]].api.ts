import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['GET /api/v2/sykmeldinger']

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        await proxyKallTilBackend({
            req: req,
            res: res,
            tillatteApier: tillatteApier,
            backend: 'sykmeldinger-backend',
            backendHostname: 'sykmeldinger-backend.teamsykmelding',
            backendClientId: serverRuntimeConfig.flexBucketUploaderClientId,
        })
    }
)

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
