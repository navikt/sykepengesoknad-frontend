import { collectDefaultMetrics, Counter } from 'prom-client'

import { logger } from './utils/logger'

declare global {
    // eslint-disable-next-line no-var
    var _metrics: AppMetrics
}
const PUBLIC_FILE = /\.(.*)$/
const UUID =
    /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/g
const ORGNR = /\b[0-9a-f]{9}\b/g
export function cleanPathForMetric(value: string): string {
    return value?.replace(UUID, '[uuid]').replace(ORGNR, '[orgnr]')
}

export function shouldLogMetricForPath(cleanPath: string | undefined): boolean {
    if (!cleanPath) return false

    const hasFileExtension = PUBLIC_FILE.test(cleanPath)
    const isNextInternal = cleanPath.startsWith('/_next')

    return !hasFileExtension && !isNextInternal
}

export class AppMetrics {
    constructor() {
        logger.info('Initializing metrics client')
        collectDefaultMetrics()
    }

    public pageInitialLoadCounter = new Counter({
        name: 'request_counter',
        help: 'Number of requests',
        labelNames: ['path'],
    })
    public wonderwallRedirect = new Counter({
        name: 'wonderwall_redirect_counter',
        help: 'Requests redirected to wonderwall login',
        labelNames: ['path'],
    })
    public loginserviceRedirect = new Counter({
        name: 'loginservice_redirect_counter',
        help: 'Requests redirected to loginservice login',
        labelNames: ['path'],
    })
    public apiUnauthorized = new Counter({
        name: 'api_unauthorized_counter',
        help: 'Requests to API routes that are unauthorized',
        labelNames: ['path'],
    })
    public apiAuthorized = new Counter({
        name: 'api_authorized_counter',
        help: 'Requests to API routes that are authorized',
        labelNames: ['path'],
    })
}

global._metrics = global._metrics || new AppMetrics()

export default global._metrics
