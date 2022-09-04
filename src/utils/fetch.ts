import { v4 as uuidv4 } from 'uuid'

import { logger } from './logger'

export type FetchResult = { requestId: string; response: Response }

const fetchMedRequestId = async (url: string, options: RequestInit = {}): Promise<FetchResult> => {
    const requestId = uuidv4()

    options.headers = options.headers
        ? { ...options.headers, 'x-request-id': requestId }
        : { 'x-request-id': requestId }

    try {
        // fetch() kaster exception for nettverksfeil, men ikke HTTP-statuskoder.
        const response = await fetch(url, options)
        return { requestId, response }
    } catch (e: any) {
        // Logger x_request_id i stedet for x-request-id for å matche logging fra
        // ingress-controller og sykepengesoknad-backend.
        logger.error(`${e} - Kall til url: ${options.method} ${url} med x_request_id: ${requestId} feilet.`)
        throw e
    }
}

export const tryFetch = async (url: string, options: RequestInit = {}, errorHandler: Function) => {
    const requestId = uuidv4()

    options.headers = options.headers
        ? { ...options.headers, 'x-request-id': requestId }
        : { 'x-request-id': requestId }

    let response
    try {
        response = await fetch(url, options)
    } catch (e: any) {
        throw new FetchError(`${e} - Feil ved kall til url: ${options.method} ${url} med x_request_id: ${requestId}.`)
    }

    if (response.status == 401) {
        window.location.reload()
        throw new Error()
    }

    if (!response.ok) {
        errorHandler()
        throw new FetchError(
            `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} og x_request_id: ${requestId}.`
        )
    }
}

export class FetchError extends Error {}

export default fetchMedRequestId
