import pino from 'pino'

import fetchMedRequestId from './fetch'

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async (level, logEvent) => {
                    try {
                        await fetchMedRequestId('/syk/sykepengesoknad/api/logger', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        })
                    } catch (e) {
                        // eslint-disable-next-line no-console
                        console.warn(`Unable to log the following event to backend: ${logEvent}`, e)
                    }
                },
            },
        },
    })

const createBackendLogger = (): pino.Logger =>
    pino({
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() }
            },
        },
    })

export const logger = typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger()
