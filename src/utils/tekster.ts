import OpplysningerTekster from '../components/soknaden/opplysninger/opplysninger-tekster';
import StatusPanelTekster from '../components/soknaden/status/status-panel-tekster';
import SoknadIntroTekster from '../components/soknaden/soknad-intro/soknad-intro-tekster';
import SoknaderTekster from '../pages/soknader/soknader-tekster';
import BannerTekster from '../components/banner/banner-tekster';
import BjornTekster from '../components/sporsmal/bjorn/bjorn-tekster';
import KnapperadTekster from '../components/sporsmal/sporsmal-form/knapperad-tekster';
import SoknadenTekster from '../pages/soknad/soknaden-tekster';
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster';
import TeaserTekster from '../components/soknader/teaser/teaser-tekster';
import UtbetalingerTekster from '../components/soknader/utbetalinger/utbetalinger-tekster';
import OppsummeringTekster from '../components/soknaden/oppsummering/oppsummering-tekster';

const tekster = {
    ...OpplysningerTekster.nb,
    ...StatusPanelTekster.nb,
    ...SoknadIntroTekster.nb,
    ...SoknaderTekster.nb,
    ...BannerTekster.nb,
    ...BjornTekster.nb,
    ...KnapperadTekster.nb,
    ...SoknadenTekster.nb,
    ...SporsmalTekster.nb,
    ...TeaserTekster.nb,
    ...UtbetalingerTekster.nb,
    ...OppsummeringTekster.nb
};


export const tekst = (tekst: string): string => {
    const verdi = tekster[tekst];
    return verdi ? verdi : tekst;
};

export const getLedetekst = (text: string, data: any): string => {
    if (text === undefined || data === undefined) {
        return '';
    }
    let newtext = text;
    Object.keys(data).forEach((key) => {
        const regex = new RegExp(key, 'g');
        newtext = newtext.replace(regex, data[key]);
    });
    return newtext;
};
