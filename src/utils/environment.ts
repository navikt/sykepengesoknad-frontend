import { bundledEnv } from './env'

const BASE_PATH = '/syk/sykepengesoknad'

export function isProd() {
    return bundledEnv.NEXT_PUBLIC_RUNTIME_ENV === 'prod-gcp'
}
export function isLabs() {
    return bundledEnv.NEXT_PUBLIC_RUNTIME_ENV === 'demo'
}

export function isIntegrationtest() {
    return isMockBackend() && !isOpplaering()
}

export function isMockBackend() {
    return bundledEnv.NEXT_PUBLIC_MOCK_BACKEND
}

export function isOpplaering() {
    return bundledEnv.NEXT_PUBLIC_OPPLAERING
}

export function umamiEnabled() {
    return bundledEnv.NEXT_PUBLIC_UMAMI_ENABLED
}

export function sykmeldingerUrl() {
    return bundledEnv.NEXT_PUBLIC_SYKMELDINGER_URL
}

export function sykefravaerUrl() {
    return bundledEnv.NEXT_PUBLIC_SYKEFRAVAER_URL
}

export function minSideUrl() {
    return bundledEnv.NEXT_PUBLIC_MINSIDE_URL
}

export function vedlikehold(): boolean {
    return bundledEnv.NEXT_PUBLIC_VEDLIKEHOLD
}

export function isLocalBackend(): boolean {
    return bundledEnv.NEXT_PUBLIC_LOCAL_BACKEND
}

export function telemetryCollectorURL(): string | undefined {
    return bundledEnv.NEXT_PUBLIC_TELEMETRY_URL ?? undefined
}

export function naisAppImage() {
    return bundledEnv.NEXT_PUBLIC_VERSION ?? undefined
}

export function naisAppName() {
    return bundledEnv.NEXT_PUBLIC_APP_NAME
}

export function basePath() {
    return BASE_PATH
}
export function sendInnUrl() {
    return bundledEnv.NEXT_PUBLIC_SEND_INN_URL
}
