class Environment {

    private env = (window as any)._env_;

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
}

const env = new Environment();

export default env;
