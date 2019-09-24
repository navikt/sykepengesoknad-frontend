import { getLedetekst } from '@navikt/digisyfo-npm';
import { fjernIndexFraTag, formaterEnkeltverdi } from '../sporsmal/field-utils';
import { beregnFeilmeldingstekstFraTag } from './valider-sporsmal';
import { TagTyper } from '../../../src/types/enums';
import { SvarVerdi } from '../../../src/types/types';

const validerTall = (min: number, max: number, tag: TagTyper, verdi: SvarVerdi, undertekst: string) => {
    const tagUtenIndex = fjernIndexFraTag(tag);
    const tagtype = tagUtenIndex as keyof typeof TagTyper;
    const tagTyperElement = TagTyper[tagtype];
    const blankfeilmelding = beregnFeilmeldingstekstFraTag(tagTyperElement);
    const formatertVerdi = formaterEnkeltverdi(verdi);
    const parsetVerdi = parseInt(formatertVerdi, 10);
    if (parsetVerdi > max || parsetVerdi < min) {
        return getLedetekst('soknad.feilmelding.tall-min-max', {
            '%MIN%': min,
            '%MAX%': max,
        });
    }
    if (!parsetVerdi || isNaN(parsetVerdi)) {
        return blankfeilmelding;
    }
    if (undertekst === 'prosent' && formatertVerdi.indexOf(',') > -1) {
        return 'Prosenten må oppgis som et helt tall uten komma';
    }
    return undefined;
};

export default validerTall;
