import { useCallback, useMemo, useState } from 'react'

import { FetchState, FetchStatus } from './utils'

export interface Fetch<D = any, FP = any> extends FetchState<D> {
    fetch: (url: string, request?: RequestInit, onFinished?: (fetchState: FetchState<D>) => void) => void;
    reset: () => void;
}

const createInitialFetchState = (): FetchState<any> => ({
    status: FetchStatus.NOT_STARTED,
    error: null,
    data: null,
    httpCode: -1,
})

const createPendingFetchState = (): FetchState<any> => ({
    status: FetchStatus.PENDING,
    error: null,
    data: null,
    httpCode: -1
})

const createFinishedFetchState = <D = {}>(data: D | null, error: any, httpCode: number): FetchState<any> => ({
    status: FetchStatus.FINISHED,
    error,
    data: data,
    httpCode,
})

const useFetch = <D = {}>(): Fetch<D> => {
    const [ fetchState, setFetchState ] = useState<FetchState<D>>(createInitialFetchState())

    const apiFetch = (url: string, request?: RequestInit, onFinished?: (fetchState: FetchState<D>) => void) => {
        setFetchState(createPendingFetchState())

        fetch(url, request)
            .then(async(res) => {
                const httpCode = res.status
                let state: FetchState<D>

                if ([ 200, 201, 203, 206 ].includes(httpCode)) {
                    try {
                        const data = await res.json()
                        state = createFinishedFetchState(data, null, httpCode)
                    } catch (error) {
                        state = createFinishedFetchState(null, error, httpCode)
                    }
                } else {
                    state = createFinishedFetchState(null, null, httpCode)
                }

                return state
            })

            .catch(error => {
                return createFinishedFetchState(null, error, -1)
            })
            .then(state => {
                if (onFinished) {
                    onFinished(state)
                }
                setFetchState(state)
            })
    }

    const apiFetchCallback = useCallback(apiFetch, [])
    const resetCallback = useCallback(() => setFetchState(createInitialFetchState()), [])

    return useMemo(() => {
        return { ...fetchState, fetch: apiFetchCallback, reset: resetCallback }
    }, [ fetchState, apiFetchCallback, resetCallback ])
}

export default useFetch
