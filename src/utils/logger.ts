import safeStringify from 'fast-safe-stringify'

const frontendlogger = (window as any).frontendlogger

// Grafana - Metrikk
export const event = (arg: object): void => {
    frontendlogger.event(arg)
}

const msgToString = (msg: string, arg?: any): string => {
    if (arg) {
        if(arg.stack){
            return `${msg} - ${safeStringify(arg.stack)}`
        }
        return `${msg} - ${safeStringify(arg)}`
    }
    return msg
}

// Kibana - Warning
export const warn = (msg: string, arg?: any): void => {
    frontendlogger.warn(msgToString(msg, arg))
}

// Kibana - Info
export const info = (msg: string, arg?: any): void => {
    frontendlogger.info(msgToString(msg, arg))
}

// Kibana - Error
export const error = (msg: string, arg?: any): void => {
    frontendlogger.error(msgToString(msg, arg))
}

export const logger = {
    event,
    error,
    warn,
    info,
}
