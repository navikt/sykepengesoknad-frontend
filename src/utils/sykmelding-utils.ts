import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import { Soknad, Sykmelding } from '../types/types';

export const kanEndreSykmeldingArbeidssituasjon = (soknad: Soknad, sykmelding: Sykmelding) => {
    const FIRE_MANEDER_SIDEN = new Date();
    FIRE_MANEDER_SIDEN.setMonth(FIRE_MANEDER_SIDEN.getMonth() - 4);
    return sykmelding.sendtDato > FIRE_MANEDER_SIDEN
        && !sykmeldingHarBehandletSoknad(soknad, sykmelding.id)
        && toggleSykmeldingEndreArbeidssituasjon();
};

export const sykmeldingHarBehandletSoknad = (soknad: Soknad, sykmeldingId: string) => {
    return soknad.sykmeldingId === sykmeldingId && soknad.status === RSSoknadstatus.SENDT;
};

export const toggleSykmeldingEndreArbeidssituasjon = () => {
    return true; // TODO: Sette unleash på appStore og gjøre denne sjekken: unleashToggles.data[UnleashToggles.SYKMELDING_ARBEIDSSITUASJON] === true;
};
