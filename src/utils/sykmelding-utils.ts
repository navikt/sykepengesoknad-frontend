import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import { Soknad, Sykmelding, SykmeldingPeriode } from '../types/types';
import dayjs from 'dayjs';

export const kanEndreSykmeldingArbeidssituasjon = (sykmelding: Sykmelding, soknad: Soknad | undefined) => {
    if (soknad === undefined) return false;
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

// TODO: Det skjer noe rart her. Browser og kompilator sier at tom og fom verken er dato eller string
export function sorterPerioderEldsteFoerst(perioder: SykmeldingPeriode[]) {
    return perioder.sort((a: SykmeldingPeriode, b: SykmeldingPeriode) => {
        if (s2d(a.fom).getTime() !== s2d(b.fom).getTime()) {
            return s2d(a.fom).getTime() - s2d(b.fom).getTime();
        }
        return s2d(a.tom).getTime() - s2d(b.tom).getTime();
    });
}

const s2d = (datostreng: any) => {
    const dato: Date = dayjs(datostreng).toDate();
    return dato;
};
