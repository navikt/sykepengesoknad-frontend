import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function isProd() {
    return publicRuntimeConfig.env === 'prod'
}
export function isLabs() {
    return publicRuntimeConfig.env === 'labs'
}

export function isIntegrationtest() {
    return isMockBackend() && !isOpplaering()
}

export function isMockBackend() {
    return publicRuntimeConfig.mockBackend === 'true'
}

export function isOpplaering() {
    return publicRuntimeConfig.opplaering === 'true'
}

export function amplitudeEnabled() {
    return publicRuntimeConfig.amplitudeEnabled === 'true'
}

export function sykmeldingerUrl() {
    return publicRuntimeConfig.sykmeldingerUrl
}

export function sykefravaerUrl() {
    return publicRuntimeConfig.sykefravaerUrl
}

export function minSideUrl() {
    return publicRuntimeConfig.minSideUrl
}

export function vedlikehold(): boolean {
    return publicRuntimeConfig.vedlikehold === 'true'
}

export function telemetryCollectorURL() {
    return publicRuntimeConfig.telemetryCollectorURL
}

export function naisAppImage() {
    return publicRuntimeConfig.naisAppImage
}

export function naisAppName() {
    return publicRuntimeConfig.naisAppName
}

export function basePath() {
    return publicRuntimeConfig.basePath
}
export function sendInnUrl() {
    return publicRuntimeConfig.sendInnUrl
}
