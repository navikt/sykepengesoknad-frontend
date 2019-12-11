import React from 'react';
import Sporsmalene from '../sporsmalene';
import TallKomp from '../typer/tall-komp';
import DatoKomp from '../typer/dato-komp';
import JaNeiKomp from '../typer/ja-nei-komp';
import { Sporsmal } from '../../../types/types';
import UkjentSporsmal from '../ukjent-sporsmal';
import CheckboxPanel from '../typer/checkbox-panel';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import PeriodeKomp from '../typer/periode-komp';
import './undersporsmal.less';

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const Undersporsmal = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />;

        case RSSvartype.DATO:
            return <DatoKomp sporsmal={sporsmal} />;

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.PERIODER:
            return <PeriodeKomp sporsmal={sporsmal} />;

        case RSSvartype.JA_NEI:
            return <JaNeiKomp sporsmal={sporsmal} />;

        case RSSvartype.CHECKBOX_GRUPPE:
        case RSSvartype.TALL:
            return <TallKomp sporsmal={sporsmal} desimaler={0} />;

        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.FRITEKST: {
            return (
                <div className="soknad__undersporsmal">
                    <Sporsmalene />
                </div>
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
