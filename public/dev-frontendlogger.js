function log(level, data) {
    if (typeof data === 'string') {
        data = { message: data }
    }
    if (level === 'error') {
        // eslint-disable-next-line no-console
        console.error(data)
    } else {
        // eslint-disable-next-line no-console
        console.log(level, data)
    }
}

window.onerror = function(message, url, line, column, error) {
    const json = {
        message: message,
        jsFileUrl: url,
        lineNumber: line,
        column: column,
        messageIndexed: message
    }

    if (error) {
        json.stacktrace = error.stack ? error.stack : error
        json.pinpoint = {
            message,
            url,
            line,
            column,
            error: JSON.stringify(error)
        }
    }

    log('error', json)
}


window.frontendlogger.info = function(data) {
    log('info', data)
}
window.frontendlogger.warn = function(data) {
    log('warn', data)
}
window.frontendlogger.error = function(data) {
    log('error', data)
}
