import React from 'react';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import DatoKomp from './typer/dato-komp';
import TallKomp from './typer/tall-komp';
import tekster from './sporsmal-tekster';
import CheckboxPanel from './typer/checkbox-panel';
import { useParams } from 'react-router-dom';
import { useAppStore } from '../../data/stores/app-store';
import JaNeiKomp from './typer/ja-nei-komp';
import './sporsmalene.less';

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX: {
            return <CheckboxPanel />;
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return null;
        }
        case RSSvartype.CHECKBOX_PANEL: {
            return <CheckboxPanel />;
        }
        case RSSvartype.DATO: {
            return <DatoKomp />;
        }
        case RSSvartype.FRITEKST: {
            return null;
        }
        case RSSvartype.IKKE_RELEVANT: {
            return null;
        }
        case RSSvartype.JA_NEI: {
            return <JaNeiKomp />;
        }
        case RSSvartype.LAND: {
            return null;
        }
        case RSSvartype.PERIODE: {
            return null;
        }
        case RSSvartype.PERIODER: {
            return null;
        }
        case RSSvartype.PROSENT: {
            return <TallKomp label={tekster['soknad.prosent']} desimaler={1} />;
        }
        case RSSvartype.RADIO:
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT: {
            return null;
        }
        case RSSvartype.TALL: {
            return <TallKomp label={sporsmal.undertekst} desimaler={2} />;
        }
        case RSSvartype.TIMER: {
            return <TallKomp label={tekster['soknad.timer-totalt']} desimaler={0} />;
        }
        default: {
            return null;
        }
    }
};

export default Sporsmalene;
