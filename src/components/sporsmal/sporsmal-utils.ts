import { TagTyper } from '../../types/enums';
import { Soknad } from '../../types/types';
import { SEPARATOR } from '../../utils/constants';

export const erSisteSide = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    const tag = sporsmal.tag;
    return [ TagTyper.VAER_KLAR_OVER_AT, TagTyper.BEKREFT_OPPLYSNINGER ].indexOf(tag) > -1;
};

export const hentNokkel = (soknad: Soknad, sidenummer: number) => {
    const sporsmal = soknad.sporsmal[sidenummer - 1];
    if (sporsmal === undefined) {
        return '';
    }
    const nokkel = fjernIndexFraTag(sporsmal.tag).toLowerCase();
    return sidenummer === 1
        ? 'sykepengesoknad.foer-du-begynner.tittel'
        : erSisteSide(soknad, sidenummer)
            ? 'sykepengesoknad.til-slutt.tittel'
            : `sykepengesoknad.${nokkel}.tittel`;
};

export const pathUtenSteg = (pathname: string) => {
    const arr: string[] = pathname.split(SEPARATOR);
    arr.pop();
    return arr.join(SEPARATOR);
};

export const fjernIndexFraTag = (tag: TagTyper): TagTyper => {
    let stringtag: string = tag.toString();
    const separator = '_';
    const index = stringtag.lastIndexOf(separator);
    if (index === (stringtag.length - 2) || index === (stringtag.length - 1)) {
        stringtag = stringtag.slice(0, index);
    }
    return TagTyper[stringtag as keyof typeof TagTyper];
};
