import { Soknad } from '../../../types/types';
import { RSSoknadstype } from '../../../types/rs-types/rs-soknadstype';
import { hentSporsmal } from '../../../utils/soknad-utils';
import { TagTyper } from '../../../types/enums';
import { FieldValues } from 'react-hook-form';

export default (soknad: Soknad, formValues: FieldValues) => {
    if (soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND) {

        const arbiedsgiverId = hentSporsmal(soknad, TagTyper.ARBEIDSGIVER)!.id;
        const ferieId = hentSporsmal(soknad, TagTyper.FERIE)!.id;

        const harFerie = formValues[ferieId] === 'JA';
        const harArbeidsgiver = formValues[arbiedsgiverId] === 'JA';

        if (harArbeidsgiver && harFerie) {
            return false
        }
    }

    return true
}
