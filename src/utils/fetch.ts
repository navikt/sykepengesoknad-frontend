import { v4 as uuidv4 } from 'uuid'

import { logger } from './logger'

const fetchMedRequestId = async (url: string, options: RequestInit) => {
    const uuid = uuidv4()

    options.headers = options.headers ? { ...options.headers, 'x-request-id': uuid } : { 'x-request-id': uuid }

    try {
        // fetch() kaster exception for nettverksfeil, men ikke HTTP-statuskoder.
        return await fetch(url, options)
    } catch (e: any) {
        // Logger x_request_id i stedet for x-request-id for å matche logging fra
        // ingress-controller og sykepengesoknad-backend.
        logger.error(`Kall til url: ${url} med x_request_id: ${uuid} feilet.`, e)
        throw e
    }
}

export default fetchMedRequestId
