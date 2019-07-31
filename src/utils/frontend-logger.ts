import { APP_NAME } from './constants';
import { logger } from './logger';

const logEvent = (logTag: string, fields?: {}, tags?: {}): void => {
    const frontlogger = (window as any).frontendlogger;

    if (frontlogger && frontlogger.event) {
        frontlogger.event(logTag, fields ? fields : {}, tags ? tags : {});
    } else {
        logger.log('Event', logTag, 'Fields:', fields, 'Tags:', tags);
    }
};

const logError = (fields?: {}, tags?: {}): void => {
    logEvent(`${APP_NAME}.error`, fields, tags);
};

const logMetrikk = (metrikkNavn: string, fields?: {}, tags?: {}): void => {
    logEvent(`${APP_NAME}.metrikker.${metrikkNavn}`, fields, tags);
};

export const frontendlogger = {
    logEvent,
    logMetrikk,
    logError
};
