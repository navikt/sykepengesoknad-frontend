import { v4 as uuidv4 } from 'uuid'

export type FetchResult = { requestId: string; response: Response }

export type ErrorHandler = (result: any) => void

export class FetchError extends Error {}

export class AuthenticationError extends Error {}

const fetchMedRequestId = async (
    url: string,
    options: RequestInit = {},
    errorHandler?: ErrorHandler
): Promise<FetchResult> => {
    const requestId = uuidv4()

    options.headers = options.headers
        ? { ...options.headers, 'x-request-id': requestId }
        : { 'x-request-id': requestId }

    let response
    try {
        response = await fetch(url, options)
    } catch (e) {
        throw new FetchError(
            `${e} - Kall til url: ${options.method} ${url} og x_request_id: ${requestId} feilet uten svar fra backend.`
        )
    }

    if (response.status == 401) {
        window.location.reload()
        throw new AuthenticationError('Reloader siden på grunn av HTTP-kode 401 fra backend.')
    }

    if (!response.ok) {
        if (errorHandler) {
            errorHandler(response)
        }
        throw new FetchError(
            `Kall til url: ${options.method} ${url} og x_request_id: ${requestId} feilet med HTTP-kode: ${response.status}.`
        )
    }

    return { requestId, response }
}

export const fetchJsonMedRequestId = async (url: string, options: RequestInit = {}, errorHandler?: ErrorHandler) => {
    const fetchResult = await fetchMedRequestId(url, options, errorHandler)
    const response = fetchResult.response

    try {
        return await response.json()
    } catch (e) {
        throw new FetchError(
            `${e} - Kall til url: ${options.method} ${url} og x_request_id: ${fetchResult.requestId} feilet ved parsing av JSON med HTTP-kode: ${response.status}.`
        )
    }
}

export default fetchMedRequestId
