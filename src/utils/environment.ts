class Environment {

    private env = (window as any)._env_;

    get isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    get isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    get isProd() {
        return this.env.ENVIRONMENT === 'prod'
    }

    get syfoapiRoot() {
        return this.env.SYFOAPI_ROOT
    }

    get syforestRoot() {
        return this.env.SYFOREST_ROOT
    }

    get isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    get isOpplaering() {
        return this.env.OPPLAERING === 'true'
    }

    get isBrukSykmeldingerBackendProxy() {
        return this.env.BRUK_SYKMELDINGER_BACKEND_PROXY === 'true'
    }

    get sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    get loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
    }

    get loginServiceRedirectUrl() {
        return this.env.LOGINSERVICE_REDIRECT_URL
    }

    get amplitudeKey() {
        return this.env.AMPLITUDE_KEY
    }

    get amplitudeEnabled() {
        return this.env.AMPLITUDE_ENABLED === 'true'
    }

    get baseName() {
        return this.env.BASE_NAME
    }

    get sykefravaerUrl() {
        return this.env.SYKEFRAVAER_URL
    }
}

const env = new Environment()

export default env
