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

export function publicPath() {
    return publicRuntimeConfig.publicPath
}

export function minSideUrl() {
    return publicRuntimeConfig.minSideUrl
}

export function vedlikehold(): boolean {
    return publicRuntimeConfig.vedlikehold === 'true'
}
