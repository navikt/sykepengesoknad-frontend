import * as React from 'react';
import {Soknad} from '../../../types/types';
import Feilmelding from '../../feilmelding';
import AvbruttSoknadArbeidstaker from '../../../soknad/avbrutt-soknad-arbeidstaker';
import beregnSteg from '../../brodsmuler/beregn-steg';
import {RSSoknadstatus} from '../../../types/rs-types/rs-soknadstatus';
import {Steg} from '../../../types/enums';
import SoknadKvitteringSjekker from '../../kvittering/soknad-kvittering-sjekker';

interface SoknadArbeidstakerProps {
    sti: string,
    soknad: Soknad
}

const SoknadArbeidstakerSkjema = ({sti, soknad}: SoknadArbeidstakerProps) => {
    const steg = beregnSteg(sti);

    switch (steg) {
        case Steg.KVITTERING: {
            return <SoknadKvitteringSjekker soknad={soknad} />;
        }
        default: {
            //TODO return <EttSporsmalPerSideContainer {...props} />;
            return null
        }
    }
};

const SoknadArbeidstaker = ({soknad, sti}: SoknadArbeidstakerProps) => {
    console.log('soknad.status', soknad.status); //tslint:disable-line FJERNES
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            return <SoknadArbeidstakerSkjema soknad={soknad} sti={sti} />;
        }
        case RSSoknadstatus.SENDT:
        case RSSoknadstatus.KORRIGERT: {
            if (beregnSteg(sti) === Steg.KVITTERING) {
                return <SoknadKvitteringSjekker soknad={soknad} />;
            }
            return null // <SendtSoknadArbeidstaker {...props} />; TODO: Komponent tas inn senere
        }
        case RSSoknadstatus.AVBRUTT: {
            return <AvbruttSoknadArbeidstaker {...{soknad, sti}} />;
        }
        default: {
            return <Feilmelding melding="Søknaden har ukjent status"/>;
        }
    }
};

export default SoknadArbeidstaker;
