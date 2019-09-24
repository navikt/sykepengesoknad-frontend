import * as React from 'react';
import { Soknad } from '../../../../src/types/types';
import Feilmelding from '../../../../src/components/feilmelding';
import AvbruttSoknadArbeidstaker from '../../../../src/soknad/avbrutt-soknad-arbeidstaker';
import beregnSteg from '../../../../src/components/brodsmuler/beregn-steg';
import { RSSoknadstatus } from '../../../../src/types/rs-types/rs-soknadstatus';
import { Steg } from '../../../../src/types/enums';
import SoknadKvitteringSjekker from '../../kvittering/soknad-kvittering-sjekker';
import EttSporsmalPerSideContainer from '../../sporsmal/ett-sporsmal/ett-sporsmal-per-side';

interface SoknadArbeidstakerProps {
    sti: string,
    soknad: Soknad
}

const SoknadArbeidstakerSkjema = ({sti, soknad}: SoknadArbeidstakerProps) => {
    const props: any = {sti, soknad};
    const steg = beregnSteg(sti);

    switch (steg) {
        case Steg.KVITTERING: {
            return <SoknadKvitteringSjekker soknad={soknad} />;
        }
        default: {
            return <EttSporsmalPerSideContainer {...props} />;
        }
    }
};

const SoknadArbeidstaker = ({soknad, sti}: SoknadArbeidstakerProps) => {
    console.log('soknad.status', soknad.status); //tslint:disable-line TODO: FJERNES
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
