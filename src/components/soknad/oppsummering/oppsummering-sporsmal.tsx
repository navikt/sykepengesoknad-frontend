import React from 'react';
/*import OppsummeringPerioder from './OppsummeringPerioder';
import OppsummeringDato from './OppsummeringDato';
import OppsummeringCheckboxgruppe from './OppsummeringCheckboxgruppe';
import OppsummeringTall from './OppsummeringTall';
import OppsummeringJaEllerNei from './OppsummeringJaEllerNei';
import OppsummeringFritekst from './OppsummeringFritekst';
import OppsummeringUndertekst from './OppsummeringUndertekst';
import OppsummeringRadioGruppe from './OppsummeringRadioGruppe';
import OppsummeringLand from './OppsummeringLand';*/
import {RSSvartype} from '../../../types/rs-types/rs-svartype';

interface OppsummeringSporsmalProps {
    svartype: RSSvartype,
    overskriftsnivaa: number,
}

const OppsummeringSporsmal = ({ svartype, overskriftsnivaa }: OppsummeringSporsmalProps) => {
    switch (svartype) {
        /*case RSSvartype.CHECKBOX_PANEL:
        case RSSvartype.CHECKBOX: {
            return <OppsummeringCheckbox svartype={svartype} overskriftsnivaa={overskriftsnivaa} />;
        }
        case RSSvartype.JA_NEI: {
            return <OppsummeringJaEllerNei {...props} />;
        }
        case RSSvartype.DATO: {
            return <OppsummeringDato {...props} />;
        }
        case RSSvartype.PERIODER: {
            return <OppsummeringPerioder {...props} />;
        }
        case RSSvartype.FRITEKST: {
            return <OppsummeringFritekst {...props} />;
        }
        case RSSvartype.LAND: {
            return <OppsummeringLand {...props} />;
        }
        case RSSvartype.IKKE_RELEVANT: {
            return <OppsummeringUndertekst {...props} />;
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return (<OppsummeringCheckboxgruppe {...props} />);
        }
        case RSSvartype.TALL:
        case RSSvartype.PROSENT:
        case RSSvartype.TIMER: {
            return <OppsummeringTall {...props} />;
        }
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT:
        case RSSvartype.RADIO_GRUPPE: {
            return <OppsummeringRadioGruppe {...props} />;
        }*/
        default: {
            return null;
        }
    }
};

export default OppsummeringSporsmal;
