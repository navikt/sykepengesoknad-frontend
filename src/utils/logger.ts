import env from './environment';
import { frontendlogger } from './frontend-logger';

export const log = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.log(...args); // eslint-disable-line
    }
};

export const warn = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.warn(...args); // eslint-disable-line
    }
};

export const info = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.info(...args); // eslint-disable-line
    }
};

export const error = (...args: any[]): void => {
    if (env.isDevelopment) {
        console.error(...args); // eslint-disable-line
        frontendlogger.logError({ error: JSON.stringify(args) });
    } else if (env.isProduction) {
        frontendlogger.logError({ error: JSON.stringify(args) });
    }
};

export const logger = {
    log,
    error,
    warn,
    info,
};
