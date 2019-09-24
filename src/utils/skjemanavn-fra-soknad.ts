import { Soknad } from '../types/types';
import { RSSoknadstype } from '../types/rs-types/rs-soknadstype';
import { getSoknadSkjemanavn, OPPHOLD_UTLAND_SKJEMA } from '../types/enums';

export const skjemanavnFraSoknad = (soknad: Soknad) => {
    switch (soknad.soknadstype) {
        case RSSoknadstype.OPPHOLD_UTLAND: {
            return OPPHOLD_UTLAND_SKJEMA;
        }
        case RSSoknadstype.ARBEIDSTAKERE:
        case RSSoknadstype.ARBEIDSLEDIG:
        case RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE: {
            return getSoknadSkjemanavn(soknad.id);
        }
        default: {
            return undefined;
        }
    }
};
