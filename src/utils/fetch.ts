import { v4 as uuidv4 } from 'uuid'

export type FetchResult = { requestId: string; response: Response }

export type ErrorHandler = (result: any) => void

export class FetchError extends Error {}

export class AuthenticationError extends Error {}

export const tryFetch = async (
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
        throw new FetchError(`${e} - Feil ved kall til url: ${options.method} ${url} med x_request_id: ${requestId}.`)
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
            `Feil ved kall til: ${options.method} ${url} med HTTP-kode: ${response.status} med x_request_id: ${requestId}.`
        )
    }

    return { requestId, response }
}

export const tryFetchData = async (url: string, options: RequestInit = {}, errorHandler?: ErrorHandler) => {
    const fetchResult = await tryFetch(url, options, errorHandler)
    const response = fetchResult.response

    try {
        return await response.json()
    } catch (e) {
        throw new FetchError(
            `${e} - Kall til: ${options.method} ${url} feilet HTTP-kode: ${response.status} ved parsing av JSON
            med x_request_id: ${fetchResult.requestId} og body: ${response.body}`
        )
    }
}
