import { NextApiRequest } from 'next/dist/shared/lib/utils'

import { ErrorMedStatus } from './ErrorMedStatus'
import { getTokenxToken } from './getTokenxToken'

interface Opts {
    url: string
    req: NextApiRequest
    clientId: string
    method: 'GET' | 'POST'
    noResponse?: boolean
}

export const tokenXProxy = async (opts: Opts) => {
    if (opts.req.method !== opts.method) {
        throw new ErrorMedStatus(`Støtter ikke metode ${opts.req.method}`, 404)
    }

    const idportenToken = opts.req.headers.authorization!.split(' ')[1]
    const tokenxToken = await getTokenxToken(idportenToken, opts.clientId)
    const response = await fetch(opts.url, {
        method: opts.req.method,
        headers: { Authorization: `Bearer ${tokenxToken}` },
        body: opts.req.body,
    })

    if (response.status != 200) {
        throw new ErrorMedStatus(`Ikke 200 svar fra ${opts.url}`, 500)
    }
    if (opts.noResponse) {
        return
    }
    return response.json()
}
