import { fjernIndexFraTag } from './field-utils';
import { Soknad } from '../../types/types';
import { TagTyper } from '../../types/enums';

export const hentSporsmalForDenneSiden = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    return [sporsmal];
};

export const hentSporsmalForOppsummering = (soknad: Soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT
            || s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });
};

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    const tag = sporsmal[0].tag;
    return [TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER].indexOf(tag) > -1;
};

export const hentTittel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer)[0];
    console.log('sporsmal.tag', sporsmal.tag); // eslint-disable-line
    return sidenummer === 1
        ? 'sykepengesoknad.for-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${fjernIndexFraTag(sporsmal.tag).toLowerCase()}.tittel`;
};
