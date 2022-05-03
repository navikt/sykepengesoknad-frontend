const sessionTimestamp = new Date().toISOString()

function updateOptions(url: string, options?: RequestInit): RequestInit {
    const update: RequestInit = { ...options }
    if (url.indexOf('/api/soknader') > -1) {
        update.headers = {
            ...update.headers,
            'X-App-Started-Timestamp': sessionTimestamp,
        }
    }

    return update
}

export default function fetcher(url: string, options?: RequestInit) {
    return fetch(url, updateOptions(url, options))
}
