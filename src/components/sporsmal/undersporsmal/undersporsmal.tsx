import React from 'react';
import Sporsmalene from '../sporsmalene';
import { Sporsmal } from '../../../types/types';
import UkjentSporsmal from '../ukjent-sporsmal';
import { RSSvartype } from '../../../types/rs-types/rs-svartype';
import CheckboxPanel from '../typer/checkbox-panel';
import DatoKomp from '../typer/dato-komp';
import JaNeiKomp from '../typer/ja-nei-komp';
import TallKomp from '../typer/tall-komp';

interface UndersporsmalProps {
    sporsmal: Sporsmal;
    register?: Function;
    errors?: any;
}

const Undersporsmal = ({ sporsmal, register, errors }: UndersporsmalProps) => {
    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX:
        case RSSvartype.CHECKBOX_PANEL:
            return <CheckboxPanel sporsmal={sporsmal} register={register} errors={errors} />;

        case RSSvartype.DATO:
            return <DatoKomp sporsmal={sporsmal} register={register} errors={errors} />;

        case RSSvartype.TIMER:
        case RSSvartype.PROSENT:
        case RSSvartype.PERIODER:
        case RSSvartype.JA_NEI:
            return <JaNeiKomp sporsmal={sporsmal} register={register} errors={errors} />;

        case RSSvartype.CHECKBOX_GRUPPE:
        case RSSvartype.TALL:
            return <TallKomp sporsmal={sporsmal} register={register} errors={errors} desimaler={0} />;

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
