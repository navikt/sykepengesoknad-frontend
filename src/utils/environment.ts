class Environment implements EnvironmentInterface {
    private env = (window as any)._env_

    isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    isProd() {
        return this.env.ENVIRONMENT === 'prod'
    }

    isIntegrationtest() {
        return this.isMockBackend() && !this.isOpplaering()
    }

    flexGatewayRoot() {
        return this.env.FLEX_GATEWAY_ROOT
    }

    isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    isOpplaering() {
        return this.env.OPPLAERING === 'true'
    }

    sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
    }

    loginServiceRedirectUrl() {
        return this.env.LOGINSERVICE_REDIRECT_URL
    }

    amplitudeKey() {
        return this.env.AMPLITUDE_KEY
    }

    amplitudeEnabled() {
        return this.env.AMPLITUDE_ENABLED === 'true'
    }

    sykefravaerUrl() {
        return this.env.SYKEFRAVAER_URL
    }

    dittNavUrl() {
        return this.env.DITTNAV_URL
    }

    sendTilNavKnappDelaySeconds(): number {
        return 10
    }

    dinesakerUrl(): string {
        return this.env.DINESAKER_URL
    }

}

interface EnvironmentInterface {
    dittNavUrl(): string

    sykefravaerUrl(): string

    dinesakerUrl(): string

    amplitudeEnabled(): boolean

    amplitudeKey(): string

    loginServiceRedirectUrl(): string

    loginServiceUrl(): string

    sykmeldingerBackendProxyRoot(): string

    isOpplaering(): boolean

    isMockBackend(): boolean

    flexGatewayRoot(): string

    isIntegrationtest(): boolean

    isDev(): boolean

    isQ1(): boolean

    isProd(): boolean

    sendTilNavKnappDelaySeconds(): number
}

function hentEnvironment(): EnvironmentInterface {
    if (process.env.NODE_ENV === 'development') {
        return {
            dinesakerUrl(): string {
                return ''
            }, amplitudeEnabled(): boolean {
                return false
            }, amplitudeKey(): string {
                return ''
            }, dittNavUrl(): string {
                return ''
            }, flexGatewayRoot(): string {
                return ''
            }, isDev(): boolean {
                return true
            }, isIntegrationtest(): boolean {
                return true
            }, isMockBackend(): boolean {
                return true
            }, isOpplaering(): boolean {
                return process.env.REACT_APP_OPPLAERING === 'true'
            }, isProd(): boolean {
                return false
            }, isQ1(): boolean {
                return false
            }, loginServiceRedirectUrl(): string {
                return ''
            }, loginServiceUrl(): string {
                return ''
            }, sykefravaerUrl(): string {
                return ''
            }, sykmeldingerBackendProxyRoot(): string {
                return ''
            },
            sendTilNavKnappDelaySeconds(): number {
                return -1
            }

        }
    }
    return new Environment()
}

const env = hentEnvironment()

export default env
