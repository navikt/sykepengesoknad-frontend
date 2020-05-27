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

    get unleashUrl() {
        return this.env.UNLEASH_URL
    }

    get mockBackend() {
        return this.env.MOCK_BACKEND
    }

    get loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
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

const env = new Environment();

export default env;
