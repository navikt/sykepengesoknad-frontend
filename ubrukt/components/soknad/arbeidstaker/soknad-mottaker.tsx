import React from 'react';
// import { getLedetekst } from '@navikt/digisyfo-npm';
import { Soknad } from '../../../../src/types/types';
// import { SoknadMottakere } from '../../../types/enums';
// import populerSoknadMedSvar from '../../../utils/populer-soknad-med-svar';

/*
const mottakerTekst = (sendesTil: SoknadMottakere, mottakernavn: string): string => {
    switch (sendesTil) {
        case SoknadMottakere.NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-som-mottaker');
        }
        case SoknadMottakere.ARBEIDSGIVER: {
            return getLedetekst('sykepengesoknad.oppsummering.arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': mottakernavn });
        }
        case SoknadMottakere.ARBEIDSGIVER_OG_NAV: {
            return getLedetekst('sykepengesoknad.oppsummering.nav-og-arbeidsgiver-som-mottaker', { '%ARBEIDSGIVER%': mottakernavn });
        }
        default: {
            return '';
        }
    }
};
*/

interface SoknadMottakerProps {
    skjemasvar: {},
    soknad: Soknad,
    mottakernavn?: string,
}

const SoknadMottaker = ({ mottakernavn }: SoknadMottakerProps) => {
    // const [mottaker, setMottaker] = useState(mottakernavn);

/*
    useEffect(() => {
        const populertSoknad = populerSoknadMedSvar(soknad, skjemasvar);
        setMottaker(mottakernavn);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
*/

    return (
        mottakernavn ?
            <p className="js-mottaker sykepengerskjema__sendesTil">
                {mottakernavn}
            </p>
            : null
    );
};

export default SoknadMottaker;
