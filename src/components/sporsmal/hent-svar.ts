import { Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { RSSvarliste } from '../../types/rs-types/rs-svarliste';
import { SvarEnums } from '../../types/enums';
import { empty } from '../../utils/constants';
import { fraBackendTilDate } from '../../utils/dato-utils';

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste;
    const svar = svarliste.svar[0];

    if (sporsmal.svartype === RSSvartype.INFO_BEHANDLINGSDAGER) {
        const ukeliste: RSSvarliste[] = [];
        sporsmal.undersporsmal.forEach(uspm => {
            ukeliste.push(uspm.svarliste);
        });
        return ukeliste;
    }

    if (sporsmal.svartype.toString().startsWith('RADIO_GRUPPE')) {
        const besvartSporsmal = sporsmal.undersporsmal.find((spm: Sporsmal) => {
            return spm.svarliste.svar[0] && spm.svarliste.svar[0].verdi === SvarEnums.CHECKED;
        });
        return besvartSporsmal ? besvartSporsmal.sporsmalstekst : undefined;
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ? [] : '';
    }

    if (sporsmal.svartype === RSSvartype.DATO) {
        return fraBackendTilDate(svar.verdi);
    }

    return svar.verdi;
};

export const hentPerioder = (sporsmal: Sporsmal) => {
    const perioder: number[] = [];
    sporsmal.svarliste.svar.forEach((svar, idx) =>
        perioder.push(idx)
    );
    return perioder;
};

export const hentPeriode = (sporsmal: Sporsmal, index: number) => {
    const svar = sporsmal.svarliste.svar[index];
    const periode: Date[] = [];
    if (svar === empty) {
        return periode;
    }
    const datoer = JSON.parse(svar.verdi);
    return [ fraBackendTilDate(datoer.fom), fraBackendTilDate(datoer.tom) ];
};

export const hentFormState = (sporsmal: Sporsmal) => {
    return hentSvarliste(sporsmal);
};

const hentSvarliste = (sporsmal: Sporsmal) => {
    let svar: any = {};

    if (sporsmal.svarliste.svar[0] !== undefined) {
        svar[sporsmal.id] = sporsmal.svarliste.svar[0].verdi;
    }
    sporsmal.undersporsmal.forEach((spm) => {
        const alleUndersporsmalSvar: any = hentSvarliste(spm);
        svar = { ...svar, ...alleUndersporsmalSvar };
    });
    return svar;
};
