import React from 'react';
import SporsmalComponent from './sporsmal-component';
import { Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import UkjentSporsmal from './ukjent-sporsmal';

interface SoknadUndersporsmalProps {
    children: React.ReactNode,
}

const SoknadUndersporsmal = ({ children }: SoknadUndersporsmalProps) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

interface UndersporsmalProps {
    sporsmal: Sporsmal,
}

const Undersporsmal = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL: {
            return <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag}/>;
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
                    <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag}/>
                </SoknadUndersporsmal>
            );
        }
        case RSSvartype.IKKE_RELEVANT: {
            return (
                <div className="ekstrasporsmal">
                    <SporsmalComponent sporsmal={sporsmal} name={sporsmal.tag}/>
                </div>
            );
        }
        default: {
            return <UkjentSporsmal sporsmal={sporsmal}/>;
        }
    }
};

export default Undersporsmal;
