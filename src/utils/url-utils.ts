export const getUrlTilSoknad = (soknadId: string, side: string | undefined) => {
    const baseUrl = `${process.env.REACT_APP_CONTEXT_ROOT}/soknader/${soknadId}`;
    return side
        ? `${baseUrl}/${side}`
        : baseUrl;
};

export const getUrlTilFravaerOgFriskmelding = (soknadId: string) => {
    return getUrlTilSoknad(soknadId, 'fravaer-og-friskmelding');
};

export const getUrlTilAktiviteterISykmeldingsperioden = (soknadId: string) => {
    return getUrlTilSoknad(soknadId, 'aktiviteter-i-sykmeldingsperioden');
};

export const getUrlTilOppsummering = (soknadId: string) => {
    return getUrlTilSoknad(soknadId, 'oppsummering');
};

export const getUrlTilKvittering = (soknadId: string) => {
    return getUrlTilSoknad(soknadId, 'kvittering');
};

export const getUrlTilSykmelding = (sykmeldingId: string) => {
    return `/sykmeldinger/${sykmeldingId}/`;
};
export const erHerokuApp = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    return url.indexOf('herokuapp') > -1;
};
export const getSykefravaerUrl = (): string => {
    return erHerokuApp()
        ? 'https://sykefravaer.herokuapp.com'
        : '';
};
