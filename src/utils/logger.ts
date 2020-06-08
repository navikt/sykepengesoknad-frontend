const frontendlogger = (window as any).frontendlogger

// Grafana - Metrikk
export const event = (...args: any[]): void => {
    frontendlogger.event(...args)
}

// Kibana - Warning
export const warn = (...args: any[]): void => {
    frontendlogger.warn(...args)
}

// Kibana - Info
export const info = (...args: any[]): void => {
    frontendlogger.info(...args)
}

// Kibana - Error
export const error = (...args: any[]): void => {
    frontendlogger.error(...args)
}

export const logger = {
    event,
    error,
    warn,
    info,
}
