import { FetchInfo } from './utils';

export const lagHentLedeteksterInfo = (params?: any): FetchInfo => ({
    url: '/syfotekster/api/tekster',
});

export const hentApiUrl = () => {
    const url = window
    && window.location
    && window.location.href
        ? window.location.href
        : '';

    if (url.indexOf('tjenester.nav') > -1) {
        // Prod
        return 'https://syfoapi.nav.no/syfosoknad/api';
    } else if (url.indexOf('localhost') > -1 || url.indexOf('herokuapp') > -1) {
        // Lokalt
        return '/syfoapi/syfosoknad/api';
    }
    // Preprod
    return 'https://syfoapi-q.nav.no/syfosoknad/api';
};
