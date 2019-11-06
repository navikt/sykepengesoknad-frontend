import React from 'react';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import Dato from './typer/dato';
import Tall from './typer/tall';
import tekster from './sporsmal-tekster';
import CheckboxComp from './typer/checkbox-comp';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../data/stores/app-store';
import JaNeiRadio from './typer/ja-nei-radio';
import './sporsmalene.less';

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];
    console.log('sporsmal.svartype', sporsmal.svartype); // eslint-disable-line

    switch (sporsmal.svartype) {
        case RSSvartype.DATO: {
            return <Dato feilmelding={''} />;
        }
        case RSSvartype.TIMER: {
            return <Tall label={tekster['soknad.timer-totalt']} kunHeltall={false} feilmelding={''} />;
        }
        case RSSvartype.PROSENT: {
            return <Tall label={tekster['soknad.prosent']} kunHeltall={true} feilmelding={''} />;
        }
        case RSSvartype.TALL: {
            return <Tall label={sporsmal.undertekst} kunHeltall={false} feilmelding={''} />;
        }
        case RSSvartype.CHECKBOX: {
            return <CheckboxComp feilmelding={''} />;
        }
        case RSSvartype.PERIODER: {
            return null;
        }
        case RSSvartype.JA_NEI: {
            return <JaNeiRadio feilmelding={''} intro={''} />;
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return null;
        }
        case RSSvartype.FRITEKST: {
            return null;
        }
        case RSSvartype.IKKE_RELEVANT: {
            return null;
        }
        case RSSvartype.CHECKBOX_PANEL: {
            return <CheckboxComp feilmelding={''} />;
        }
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT: {
            return null;
        }
        case RSSvartype.LAND: {
            return null;
        }
        default: {
            return null;
        }
    }
};

export default Sporsmalene;
