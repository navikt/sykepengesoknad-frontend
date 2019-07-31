import * as React from 'react';
import { Soknad } from '../types/types';
import { SoknadStatuser } from '../types/enums';
import Feilmelding from '../components/feilmelding';
import Systemtittel from 'nav-frontend-typografi/lib/systemtittel';
import AvbruttSoknadArbeidstaker from '../soknad/avbrutt-soknad-arbeidstaker';

/*
interface SoknadArbeidstakerSkjemaProps {
    sti: string,
    soknad: Soknad
}
*/

/*
const SoknadArbeidstakerSkjema = (props: SoknadArbeidstakerSkjemaProps) => {
    const steg = beregnSteg(props.sti);
    switch (steg) {
        case Steg.KVITTERING: {
            return <SoknadKvitteringSjekker soknad={props.soknad} />;
        }
        default: {
            return <EttSporsmalPerSideContainer {...props} />;
        }
    }
};
*/

interface SoknadArbeidstakerProps {
    sti: string,
    soknad: Soknad
}

const SoknadArbeidstaker = ({ soknad, sti }: SoknadArbeidstakerProps) => {
    return <Systemtittel tag="h1">SoknadArbeidstakerSkjema inn her</Systemtittel>;

    switch (soknad.status) {
        case SoknadStatuser.NY:
        /*
                    case SoknadStatuser.UTKAST_TIL_KORRIGERING: {
                        return <SoknadArbeidstakerSkjema {...props} />;
                    }
        */
        case SoknadStatuser.SENDT:
        /*
                    case SoknadStatuser.KORRIGERT: {
                        if (beregnSteg(sti) === Steg.KVITTERING) {
                            return <SoknadKvitteringSjekker {...props} />;
                        }
                        return <SendtSoknadArbeidstaker {...props} />;
                    }
        */
        case SoknadStatuser.AVBRUTT: {
            return <AvbruttSoknadArbeidstaker {...{soknad, sti}} />;
        }
        default: {
            return <Feilmelding melding="Søknaden har ukjent status"/>;
        }
    }
};

export default SoknadArbeidstaker;
