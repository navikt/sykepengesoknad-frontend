import { TagTyper } from '../../types/enums';
import { fjernIndexFraTag } from './field-utils';
import { Soknad, Sporsmal } from '../../types/types';
import { RSSvar } from '../../types/rs-types/rs-svar';
import { RSSvarliste } from '../../types/rs-types/rs-svarliste';

export const hentSporsmalForOppsummering = (soknad: Soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT
            || s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });
};

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const tag = sporsmal.tag;
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1;
};

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return sidenummer === 1
        ? 'sykepengesoknad.foer-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}.tittel`;
};

export const settSvar = (sporsmal: Sporsmal, verdier: Record<string, string | number | boolean | Date >): void => {
    if (verdier === undefined) {
        return;
    }

    const svarene: RSSvarliste[] = [];
    Object.entries(verdier).forEach(([key, value]) => {
        const svar: RSSvar = { verdi: value ? value.toString() : '' };
        sporsmal.svarliste = {
            sporsmalId: key,
            svar: [ svar ]
        };
        svarene.push(sporsmal.svarliste)
    });
    console.log('svarene', svarene); // eslint-disable-line
};

export const hentSvar = (sporsmal: Sporsmal): any => {
    if (sporsmal.svarliste.svar[0] !== undefined) {
        return sporsmal.svarliste.svar[0].verdi;
    }
    return '';
};

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split('/');
    arr.pop();
    return arr.join('/');
};
