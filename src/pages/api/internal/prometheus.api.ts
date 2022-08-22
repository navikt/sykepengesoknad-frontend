import type { NextApiRequest, NextApiResponse } from 'next'
import { register } from 'prom-client'

async function prometheusApi(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    res.setHeader('Content-type', register.contentType)
    res.send(await register.metrics())
}

export default prometheusApi
