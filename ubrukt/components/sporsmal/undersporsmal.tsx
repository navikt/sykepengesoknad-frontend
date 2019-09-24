import React from 'react';
import { RSSvartype } from '../../../src/types/rs-types/rs-svartype';
import SporsmalComponent from './sporsmal-component';
import { Soknad, Sporsmal } from '../../../src/types/types';
import UkjentSporsmal from './ukjent-sporsmal';

interface SoknadUndersporsmalProps {
    children: React.ReactNode,
}

const SoknadUndersporsmal = ({ children }: SoknadUndersporsmalProps) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

interface UndersporsmalProps {
    sporsmal: Sporsmal,
    soknad: Soknad,
}

const Undersporsmal = ({ sporsmal, soknad }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL: {
            return <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad}/>;
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
            return (
                <SoknadUndersporsmal>
                    <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad}/>
                </SoknadUndersporsmal>
            );
        }
        case RSSvartype.IKKE_RELEVANT: {
            return (
                <div className="ekstrasporsmal">
                    <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag} soknad={soknad}/>
                </div>
            );
        }
        default: {
            return <UkjentSporsmal sporsmal={sporsmal}/>;
        }
    }
};

export default Undersporsmal;
