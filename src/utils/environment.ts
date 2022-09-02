import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

export function isDev() {
    return publicRuntimeConfig.env === 'dev'
}

export function isProd() {
    return publicRuntimeConfig.env === 'prod'
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

export function loginServiceUrl() {
    return serverRuntimeConfig.loginServiceUrl
}

export function loginServiceRedirectUrl() {
    return serverRuntimeConfig.loginServiceRedirectUrl
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
