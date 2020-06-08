export enum FetchStatus {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    FINISHED = 'FINISHED'
}

export interface FetchState<D = {}> {
    status: FetchStatus;
    error: any;
    data: D | null;
    httpCode: number;
}

export interface FetchStateWithData<D = {}> extends FetchState<D> {
    data: D;
}

export const isAnyNotStartedOrPending = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => isNotStartedOrPending(f))
    }
    return isNotStartedOrPending(fetch)
}

export const hasAnyFailed = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => hasFailed(f))
    }
    return hasFailed(fetch)
}

export const hasAny401 = (fetch: FetchState | FetchState[]): boolean => {
    if (Array.isArray(fetch)) {
        return fetch.some(f => has401(f))
    }
    return has401(fetch)
}

export const isNotStarted = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED
}

export const isNotStartedOrPending = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.NOT_STARTED || fetch.status === FetchStatus.PENDING
}

export const hasFinished = (fetch: FetchState): boolean => {
    return fetch.status === FetchStatus.FINISHED
}

export const hasFailed = (fetch: FetchState): boolean => {
    return fetch.error != null || fetch.httpCode >= 400
}

export const has401 = (fetch: FetchState): boolean => {
    return fetch.httpCode === 401
}

export const hasData = <D = {}>(fetch: FetchState<D>): fetch is FetchStateWithData<D> => {
    return fetch.data != null
}
