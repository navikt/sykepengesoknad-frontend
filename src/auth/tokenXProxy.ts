import { NextApiRequest } from 'next/dist/shared/lib/utils'

import { ErrorMedStatus } from './ErrorMedStatus'
import { getTokenxToken } from './getTokenxToken'

interface Opts {
    url: string
    req: NextApiRequest
    clientId: string
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    noResponse?: boolean
    withBody?: boolean
}

export const tokenXProxy = async (opts: Opts) => {
    if (opts.req.method !== opts.method) {
        throw new ErrorMedStatus(`Støtter ikke metode ${opts.req.method}`, 404)
    }

    const idportenToken = opts.req.headers.authorization!.split(' ')[1]
    const tokenxToken = await getTokenxToken(idportenToken, opts.clientId)
    const init = {
        method: opts.req.method,
        headers: { Authorization: `Bearer ${tokenxToken}` } as any,
        body: undefined as string | undefined,
    }
    if (opts.withBody) {
        init.body = JSON.stringify(opts.req.body)
        init.headers['Content-Type'] = 'application/json'
    }
    const response = await fetch(opts.url, init)

    if (response.status < 200 || response.status >= 300) {
        throw new ErrorMedStatus(
            `Ikke 2XX svar fra ${opts.url}, men ${response.status}`,
            500
        )
    }
    if (opts.noResponse) {
        return
    }
    return response.json()
}
