import pino from 'pino'

const getFrontendLogger = (): pino.Logger =>
    pino({
        browser: {
            transmit: {
                send: async(level, logEvent) => {
                    try {
                        await fetch('/syk/sykepengesoknad/api/logger', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify(logEvent),
                        })
                    } catch (e) {
                        // eslint-disable-next-line no-console
                        console.warn(e)
                        // eslint-disable-next-line no-console
                        console.warn('Unable to log to backend', logEvent)
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

export const logger =
    typeof window !== 'undefined' ? getFrontendLogger() : createBackendLogger()
