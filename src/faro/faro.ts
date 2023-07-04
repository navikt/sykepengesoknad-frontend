import { Faro, getWebInstrumentations, initializeFaro, LogLevel } from '@grafana/faro-web-sdk'

import { isMockBackend, naisAppImage, naisAppName, telemetryCollectorURL } from '../utils/environment'

let faro: Faro | null = null

export function initInstrumentation(): void {
    if (typeof window === 'undefined' || faro !== null) return

    getFaro()
}

export function getFaro(): Faro | null {
    if (!telemetryCollectorURL()) {
        return null
    }

    if (faro != null) {
        return faro
    }

    if (isMockBackend()) {
        return null
    }
    faro = initializeFaro({
        url: telemetryCollectorURL(),
        app: {
            name: naisAppName(),
            version: naisAppImage(),
        },
        instrumentations: [
            ...getWebInstrumentations({
                captureConsole: false,
            }),
        ],
    })
    return faro
}

export function pinoLevelToFaroLevel(pinoLevel: string): LogLevel {
    switch (pinoLevel) {
        case 'trace':
            return LogLevel.TRACE
        case 'debug':
            return LogLevel.DEBUG
        case 'info':
            return LogLevel.INFO
        case 'warn':
            return LogLevel.WARN
        case 'error':
            return LogLevel.ERROR
        default:
            throw new Error(`Unknown level: ${pinoLevel}`)
    }
}
