import { v4 as uuidv4 } from 'uuid'

export type FetchResult = { requestId: string; response: Response }

export type ErrorHandler = (result: Response, requestId: string, defaultErrorHandler: () => void) => void

export class FetchError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}

export class AuthenticationError extends FetchError {
    constructor(message: string) {
        super(message, 401)
    }
}

export const fetchMedRequestId = async (
    url: string,
    options: RequestInit = {},
    errorHandler?: ErrorHandler,
): Promise<FetchResult> => {
    const requestId = uuidv4()

    options.headers = options.headers
        ? { ...options.headers, 'x-request-id': requestId }
        : { 'x-request-id': requestId }

    const fetchUrl = async () => {
        try {
            return await fetch(url, options)
        } catch (e) {
            throw new FetchError(
                `${e} - Kall til url: ${options.method} ${url} og x_request_id: ${requestId} feilet uten svar fra backend.`,
                response.status,
            )
        }
    }

    const response = await fetchUrl()

    if (response.status == 401) {
        window.location.reload()
        throw new AuthenticationError('Reloader siden på grunn av HTTP-kode 401 fra backend.')
    }

    if (!response.ok) {
        const defaultErrorHandler = () => {
            throw new FetchError(
                `Kall til url: ${options.method} ${url} og x_request_id: ${requestId} feilet med HTTP-kode: ${response.status}.`,
                response.status,
            )
        }
        if (errorHandler) {
            errorHandler(response, requestId, defaultErrorHandler)
        } else {
            defaultErrorHandler()
        }
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
            `${e} - Kall til url: ${options.method} ${url} og x_request_id: ${fetchResult.requestId} feilet ved parsing av JSON med HTTP-kode: ${response.status}.`,
            response.status,
        )
    }
}

export default fetchMedRequestId
