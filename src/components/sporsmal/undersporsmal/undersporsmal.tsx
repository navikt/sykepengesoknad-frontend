import React from 'react';
import { Sporsmal } from '../../../types/types';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import UkjentSporsmal from '../ukjent-sporsmal';

/*
interface SoknadUndersporsmalProps {
    children: React.ReactNode;
}
*/

/*
const SoknadUndersporsmal = ({ children }: SoknadUndersporsmalProps) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};
*/

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const Undersporsmal = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL: {
            return <h1>CHECKBOX_PANEL</h1>
            // return <CheckboxComp feilmelding={''} />;
        }
        case RSSvartype.DATO:
        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.PERIODER:
        case RSSvartype.JA_NEI:
        case RSSvartype.CHECKBOX_GRUPPE:
        case RSSvartype.TALL:
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.FRITEKST: {
            return <h1>FRITEKST</h1>
/*
            return (
                <SoknadUndersporsmal>
                    <Sporsmalene />
                </SoknadUndersporsmal>
            );
*/
        }
        case RSSvartype.IKKE_RELEVANT: {
            return <h1>IKKE_RELEVANT</h1>
/*
            return (
                <div className="ekstrasporsmal">
                    <Sporsmalene />
                </div>
            );
*/
        }
        default: {
            return <UkjentSporsmal sporsmal={sporsmal}/>;
        }
    }
};

export default Undersporsmal;
