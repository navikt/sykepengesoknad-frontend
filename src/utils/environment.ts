import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function isDev() {
    return publicRuntimeConfig.env === 'dev'
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

export function sykmeldingerBackendRoot() {
    return publicRuntimeConfig.sykmeldingerBackendRoot
}

export function loginServiceUrl() {
    return publicRuntimeConfig.loginServiceUrl
}

export function loginServiceRedirectUrl() {
    return publicRuntimeConfig.loginServiceRedirectUrl
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

export function dittNavUrl() {
    return publicRuntimeConfig.dittNavUrl
}

export function dinesakerUrl(): string {
    return publicRuntimeConfig.dineSakerUrl
}

export function backendApp(): string {
    return publicRuntimeConfig.backendApp
}

export function vedlikehold(): boolean {
    return publicRuntimeConfig.vedlikehold === 'true'
}

export function absoluttTvang(): boolean {
    return publicRuntimeConfig.absoluttTvang === 'true'
}
