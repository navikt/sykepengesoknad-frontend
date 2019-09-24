import { getLedetekst } from '@navikt/digisyfo-npm';
import { TagTyper } from '../../../../src/types/enums';
import { Soknad, Sporsmal } from '../../../../src/types/types';
import { fjernIndexFraTag } from '../field-utils';

export const hentSporsmalForDenneSiden = (soknad: Soknad, sidenummer: number): Sporsmal => {
    return soknad.sporsmal[sidenummer - 1];
};

export const hentSporsmalForOppsummering = (soknad: Soknad) => {
    return soknad.sporsmal.filter((s) => {
        return s.tag === TagTyper.VAER_KLAR_OVER_AT
            || s.tag === TagTyper.BEKREFT_OPPLYSNINGER;
    });
};

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal: Sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    const tag = sporsmal.tag;
    return [TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER].includes(tag);
};

export const hentTittel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = hentSporsmalForDenneSiden(soknad, sidenummer);
    const nokkel = sidenummer === 1
        ? 'sykepengesoknad.for-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${fjernIndexFraTag(sporsmal.tag)
                .toLowerCase()}.tittel`;
    return getLedetekst(nokkel);
};
