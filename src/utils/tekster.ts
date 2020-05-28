import OpplysningerTekster from '../components/opplysninger/opplysninger-tekster';
import KvitteringTekster from '../components/kvittering/kvittering-tekster';
import SoknadIntroTekster from '../components/soknad-intro/soknad-intro-tekster';
import SoknaderTekster from '../pages/soknader/soknader-tekster';
import BannerTekster from '../components/banner/banner-tekster';
import BjornTekster from '../components/sporsmal/bjorn/bjorn-tekster';
import KnapperadTekster from '../components/sporsmal/sporsmal-form/knapperad-tekster';
import SoknadenTekster from '../pages/soknad/soknaden-tekster';
import SporsmalTekster from '../components/sporsmal/sporsmal-tekster';
import TeaserTekster from '../components/soknader/teaser/teaser-tekster';
import UtbetalingerTekster from '../components/soknader/utbetalinger/utbetalinger-tekster';
import OppsummeringTekster from '../components/oppsummering/oppsummering-tekster';
import { logger } from './logger';

const tekster = {
    ...OpplysningerTekster.nb,
    ...KvitteringTekster.nb,
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
    // Generiskfeilmelding har ingen tekst
    if(!verdi && !tekst.includes('soknad.feilmelding')) {
        console.log(`Mangler teksten [ ${tekst} ]`);
        logger.error(`Mangler teksten [ ${tekst} ]`);
        return undefined as any;
    }
    return verdi;
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
