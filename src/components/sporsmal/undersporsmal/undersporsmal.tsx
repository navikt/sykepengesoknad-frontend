import React from 'react';
import { Sporsmal } from '../../../types/types';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import UkjentSporsmal from '../ukjent-sporsmal';
import CheckboxPanel from '../typer/checkbox-panel';
import Sporsmalene from '../sporsmalene';
import JaNeiKomp from '../typer/ja-nei-komp';
import TallKomp from '../typer/tall-komp';
import DatoKomp from '../typer/dato-komp';

interface SoknadUndersporsmalProps {
    children: React.ReactNode;
}

const SoknadUndersporsmal = ({ children }: SoknadUndersporsmalProps) => {
    return <div className="soknad__undersporsmal">{children}</div>;
};

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const Undersporsmal = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel />;

        case RSSvartype.DATO:
            return <DatoKomp />;

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.PERIODER:
        case RSSvartype.JA_NEI:
            return <JaNeiKomp />;

        case RSSvartype.CHECKBOX_GRUPPE:
        case RSSvartype.TALL:
            return <TallKomp desimaler={0} />;

        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.FRITEKST: {
            return (
                <SoknadUndersporsmal>
                    <Sporsmalene />
                </SoknadUndersporsmal>
            );
        }
        case RSSvartype.IKKE_RELEVANT: {
            return (
                <div className="ekstrasporsmal">
                    <Sporsmalene />
                </div>
            );
        }
        default: {
            return <UkjentSporsmal sporsmal={sporsmal}/>;
        }
    }
};

export default Undersporsmal;
