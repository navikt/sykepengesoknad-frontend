import { Soknad, Sporsmal, Sykmelding } from '../types/types';
import { PERIODE_SKILLE } from './constants';
import dayjs from 'dayjs';
import { SvarTil, TagTyper } from '../types/enums';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';

export const getSendtTilSuffix = (soknad: Soknad) => {
    if (soknad.sendtTilArbeidsgiverDato && soknad.sendtTilNAVDato) {
        return '.til-arbeidsgiver-og-nav';
    }
    if (soknad.sendtTilArbeidsgiverDato) {
        return '.til-arbeidsgiver';
    }
    if (soknad.sendtTilNAVDato) {
        return '.til-nav';
    }
    return '';
};

export const getRiktigDato = (soknad: Soknad) => {
    if (soknad.sendtTilArbeidsgiverDato && soknad.sendtTilNAVDato) {
        return soknad.sendtTilNAVDato;
    }
    if (soknad.sendtTilArbeidsgiverDato) {
        return soknad.sendtTilArbeidsgiverDato;
    }
    if (soknad.sendtTilNAVDato) {
        return soknad.sendtTilNAVDato;
    }
    return '';
};

export const svarVerdi = (sporsmal: Sporsmal): string => {
    if (sporsmal.svarliste.svar.length > 0) {
        return sporsmal.svarliste.svar[0].verdi;
    }
    return '';
};

export const periodeVerdi = (sporsmal: Sporsmal): string[] => {
    const svar = svarVerdi(sporsmal);
    if (svar.includes(PERIODE_SKILLE)) {
        return svar.split(PERIODE_SKILLE);
    }
    return [];
};

const flattenSporsmal = (sporsmal: Sporsmal[]) => {
    let flatArr: Sporsmal[] = [];
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i]);
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal));
    }
    return flatArr;
};

const sporsmalEtterTag = (sporsmal: Sporsmal[], tag: TagTyper) => {
    return sporsmal.filter((spm: Sporsmal) => spm.tag === tag);
};

const tellDager = (sporsmal: Sporsmal[], tag: TagTyper) => {
    const meldinger: Sporsmal[] = sporsmalEtterTag(sporsmal, tag);
    let dager = 0;
    if (meldinger.length > 0) {
        const arr = periodeVerdi(meldinger[0]);
        dager = dayjs(arr[0]).diff(dayjs(arr[1]), 'day');
    }
    return dager;
};

const beregnSoknadsdager = (soknad: Soknad): number => {
    let soknadDager = 0;
    if (soknad.tom !== null && soknad.fom !== null) {
        soknadDager = dayjs(soknad.tom).diff(dayjs(soknad.fom), 'day');
    }

    const flateSporsmal = flattenSporsmal(soknad.sporsmal);
    const egneDager = tellDager(flateSporsmal, TagTyper.EGENMELDINGER_NAR);
    const papirDager = tellDager(flateSporsmal, TagTyper.PAPIRSYKMELDING_NAR);
    return soknadDager + egneDager + papirDager;
};

export const lagSendTil = (soknad: Soknad, sykmelding: Sykmelding) => {
    if (soknad === undefined) {
        return [];
    }
    const totalDager = beregnSoknadsdager(soknad);

    switch (soknad.soknadstype) {
        case RSSoknadstype.ARBEIDSTAKERE:
            if (totalDager > 16) {
                return [ SvarTil.NAV, SvarTil.ARBEIDSGIVER ];
            }
            return [ SvarTil.ARBEIDSGIVER ];

        case RSSoknadstype.ARBEIDSLEDIG:
            return [ SvarTil.NAV ];

        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE:
            if (totalDager > 16 && sykmelding.sporsmal.harSykmelding) {
                return [ SvarTil.NAV ];
            }
            return [];
    }
};
