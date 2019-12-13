import React from 'react';
import TallKomp from '../typer/tall-komp';
import DatoInput from '../typer/dato-komp';
import JaNeiKomp from '../typer/ja-nei-komp';
import { Sporsmal } from '../../../types/types';
import UkjentSporsmal from '../ukjent-sporsmal';
import CheckboxPanel from '../typer/checkbox-panel';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import PeriodeInput from '../typer/periode-komp';
import './undersporsmal.less';

interface UndersporsmalProps {
    sporsmal: Sporsmal;
}

const SporsmalSwitch = ({ sporsmal }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} />;

        case RSSvartype.CHECKBOX_GRUPPE:
            return (
                <div className="soknad__undersporsmal">
                    CheckboxGruppe
                </div>
            );

        case RSSvartype.DATO:
            return <DatoInput sporsmal={sporsmal} />;

        case RSSvartype.PERIODER:
            return <PeriodeInput sporsmal={sporsmal} />;

        case RSSvartype.JA_NEI:
            return <JaNeiKomp sporsmal={sporsmal} />;

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.TALL:
            return <TallKomp sporsmal={sporsmal} desimaler={0} />;

        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
            return (
                <div className="soknad__undersporsmal">
                    RadioPanel
                </div>
            );

        case RSSvartype.IKKE_RELEVANT:
            return (
                <div className="ekstrasporsmal">
                    IkkeRelevant
                </div>
            );

        default:
            return <UkjentSporsmal sporsmal={sporsmal}/>;
    }
};

export default SporsmalSwitch;
