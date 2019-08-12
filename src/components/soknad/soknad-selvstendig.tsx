import React from 'react';
import { Soknad } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import { Steg } from '../../types/enums';
import beregnSteg from '../brodsmuler/beregn-steg';
import Feilmelding from '../feilmelding';
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
