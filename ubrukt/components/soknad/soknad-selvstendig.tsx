import React from 'react';
import { Soknad } from '../../../src/types/types';
import { RSSoknadstatus } from '../../../src/types/rs-types/rs-soknadstatus';
import { Steg } from '../../../src/types/enums';
import beregnSteg from '../../../src/components/brodsmuler/beregn-steg';
import Feilmelding from '../../../src/components/feilmelding';
import SoknadKvitteringSjekker from '../kvittering/soknad-kvittering-sjekker';

interface SoknadSelvstendigProps {
    sti: string,
    soknad: Soknad,
}

const SoknadSelvstendig = ({ soknad, sti }: SoknadSelvstendigProps) => {
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            return beregnSteg(sti) === Steg.KVITTERING
                ? <SoknadKvitteringSjekker soknad={soknad} />
                : null // <EttSporsmalPerSideContainer {...props} /> TODO: Ta inn EttSporsmalPerSideContainer
        }
        case RSSoknadstatus.SENDT:
        case RSSoknadstatus.KORRIGERT: {
            return beregnSteg(sti) === Steg.KVITTERING
                ? <SoknadKvitteringSjekker soknad={soknad} />
                : null // <SendtSoknadSelvstendig {...props} /> TODO: Ta inn SendtSoknadSelvstendig
        }
        case RSSoknadstatus.AVBRUTT: {
            return null // <AvbruttSoknadSelvstendig {...props} />; TODO: Ta inn AvbruttSoknadSelvstendig
        }
        default: {
            return <Feilmelding melding="Søknaden har ukjent status"/>;
        }
    }
};

export default SoknadSelvstendig;
