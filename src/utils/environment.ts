import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function isDev() {
    return publicRuntimeConfig.env === 'dev'
}

export function isQ1() {
    return publicRuntimeConfig.env === 'q1'
}

export function isProd() {
    return publicRuntimeConfig.env === 'prod'
}

export function isIntegrationtest() {
    return isMockBackend() && !isOpplaering()
}

export function flexGatewayRoot() {
    return publicRuntimeConfig.flexGatewayRoot
}

export function isMockBackend() {
    return publicRuntimeConfig.mockBackend === 'true'
}

export function isOpplaering() {
    return publicRuntimeConfig.opplaering === 'true'
}

export function sykmeldingerBackendProxyRoot() {
    return publicRuntimeConfig.sykmeldingerBackendProxyRoot
}

export function loginServiceUrl() {
    return publicRuntimeConfig.loginServiceUrl
}

export function loginServiceRedirectUrl() {
    return publicRuntimeConfig.loginServiceRedirectUrl
}

export function amplitudeKey() {
    return publicRuntimeConfig.amplitudeKey
}

export function amplitudeEnabled() {
    return publicRuntimeConfig.amplitudeEnabled === 'true'
}

export function sykefravaerUrl() {
    return publicRuntimeConfig.sykefravaerUrl
}

export function dittNavUrl() {
    return publicRuntimeConfig.dittNavUrl
}

export function dinesakerUrl(): string {
    return publicRuntimeConfig.dineSakerUrl
}
