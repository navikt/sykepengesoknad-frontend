import env from './environment';
import { frontendlogger } from './frontend-logger';

export const log = (...args: any[]): void => {
    if (env.isDev) {
        console.log(...args); // eslint-disable-line
    }
};

export const warn = (...args: any[]): void => {
    if (env.isDev) {
        console.warn(...args); // eslint-disable-line
    }
};

export const info = (...args: any[]): void => {
    if (env.isDev) {
        console.info(...args); // eslint-disable-line
    }
};

export const error = (...args: any[]): void => {
    if (env.isDev) {
        console.error(...args); // eslint-disable-line
    } else if (env.isProd || env.isQ1) {
        frontendlogger.logError({ error: JSON.stringify(args) });
    }
};

export const logger = {
    log,
    error,
    warn,
    info,
};
