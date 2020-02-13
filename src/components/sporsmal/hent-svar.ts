import { Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import { RSSvarliste } from '../../types/rs-types/rs-svarliste';
import { SvarEnums } from '../../types/enums';
import { empty, PERIODE_SKILLE } from '../../utils/constants';

export const hentSvar = (sporsmal: Sporsmal): any => {
    const svarliste = sporsmal.svarliste;
    const svar = svarliste.svar[0];

    if (sporsmal.svartype === RSSvartype.BEHANDLINGSDAGER) {
        const ukeliste: RSSvarliste[] = [];
        sporsmal.undersporsmal.forEach(uspm => {
            ukeliste.push(uspm.svarliste);
        });
        return ukeliste;
    }

    if (sporsmal.svartype.startsWith('RADIO_GRUPPE')) {
        const besvartSporsmal = sporsmal.undersporsmal.find((spm: Sporsmal) => {
            return spm.svarliste.svar[0] && spm.svarliste.svar[0].verdi === SvarEnums.CHECKED;
        });
        return besvartSporsmal ? besvartSporsmal.sporsmalstekst : undefined;
    }

    if (svar === undefined) {
        return sporsmal.svartype.toString().startsWith('PERIODE') ? [] : '';
    }

    if (sporsmal.svartype === RSSvartype.DATO) {
        return new Date(svar.verdi.toString());
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
    const datoer = svar.verdi.split(PERIODE_SKILLE);
    periode[0] = new Date(datoer[0]);
    periode[1] = new Date(datoer[1]);
    return periode;
};

export const hentFormState = (spmliste: Sporsmal[], id: string) => {
    let hovedSporsmal: Sporsmal = null;
    spmliste.forEach((spm) => {
        const fantHovedsporsmal = finnSporsmal(spm, id);
        if (fantHovedsporsmal) {
            hovedSporsmal = spm;
        }
    });
    return hentSvarliste(hovedSporsmal);
};

const finnSporsmal = (sporsmal: Sporsmal, id: string): boolean => {
    if (sporsmal.id === id) {
        return true;
    }
    let fantUndersporsmal = false;
    sporsmal.undersporsmal.forEach((uspm) => {
        if (finnSporsmal(uspm, id)) {
            fantUndersporsmal = true;
        }
    });
    return fantUndersporsmal;
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
