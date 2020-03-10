class Environment {

    private env = (window as any)._env_ || {
        PORT: '8080',
        MOCK_BACKEND: 'true',
        SYFOAPI_ROOT: 'http://localhost:1994/syfoapi',
        SYFOREST_ROOT: 'http://localhost:1994/syforest',
        UNLEASH_URL: 'http://localhost:1956/syfounleash',
        LOGINSERVICE_URL: 'http://localhost:5001',
        AMPLITUDE_KEY: '7a887ba3e5a07c755526c6591810101a',
        AMPLITUDE_ENABLED: 'true',
        NODE_ENV: 'development'
    };

    private get nodeEnv() {
        return process.env.NODE_ENV;
    }

    get isProduction() {
        return this.nodeEnv === 'production';
    }

    get isDevelopment() {
        return this.nodeEnv === 'development';
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
}

const env = new Environment();

export default env;
