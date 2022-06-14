import pino from 'pino'

const createLogger = (): pino.Logger =>
    pino({
        transport: { target: 'pino-pretty' },
        timestamp: pino.stdTimeFunctions.isoTime,
        formatters: {
            level: (label) => {
                return { level: label.toUpperCase() }
            },
        }
    })

export const logger = createLogger()
