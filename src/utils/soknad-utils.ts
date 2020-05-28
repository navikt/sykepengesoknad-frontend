import { Soknad, Sporsmal } from '../types/types';

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

export const flattenSporsmal = (sporsmal: Sporsmal[]) => {
    let flatArr: Sporsmal[] = [];
    for (let i = 0; i < sporsmal.length; i++) {
        flatArr.push(sporsmal[i]);
        flatArr = flatArr.concat(flattenSporsmal(sporsmal[i].undersporsmal));
    }
    return flatArr;
};
