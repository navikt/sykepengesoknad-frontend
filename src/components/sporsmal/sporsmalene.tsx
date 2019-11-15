import React from 'react';
import { useParams } from 'react-router-dom';
import { SpmKomp } from '../../types/enums';
//import { RSSvar } from '../../types/rs-types/rs-svar';
import SporsmalForm from './sporsmal-form/sporsmal-form';
import { useAppStore } from '../../data/stores/app-store';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import './sporsmalene.less';

const Sporsmalene = () => {
    const { valgtSoknad } = useAppStore();
    const { stegId } = useParams();
    const spmIndex = parseInt(stegId) - 1;
    const sporsmal = valgtSoknad.sporsmal[spmIndex];

    /*
        valgtSoknad.sporsmal.map((spm, idx) => {
            console.log('index, spørsmål', idx + ' ' + spm.sporsmalstekst.substring(0, 25)); // eslint-disable-line
            spm.svarliste.svar.map((svar: RSSvar) => {
                console.log('svar', svar.verdi); // eslint-disable-line
            })
        });
    */

    switch (sporsmal.svartype) {
        case RSSvartype.CHECKBOX: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.CHECKBOX_PANEL} />
        }
        case RSSvartype.CHECKBOX_GRUPPE: {
            return null;
        }
        case RSSvartype.CHECKBOX_PANEL: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.CHECKBOX_PANEL} />
        }
        case RSSvartype.DATO: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.DATO} />
        }
        case RSSvartype.FRITEKST: {
            return null;
        }
        case RSSvartype.IKKE_RELEVANT: {
            return null;
        }
        case RSSvartype.JA_NEI: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.JA_NEI} />
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
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.TALL} desimaler={1} />
        }
        case RSSvartype.RADIO:
        case RSSvartype.RADIO_GRUPPE:
        case RSSvartype.RADIO_GRUPPE_TIMER_PROSENT: {
            return null;
        }
        case RSSvartype.TALL: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.TALL} desimaler={2} />
        }
        case RSSvartype.TIMER: {
            return <SporsmalForm sporsmal={sporsmal} type={SpmKomp.TALL} desimaler={0} />
        }
        default: {
            return null;
        }
    }
};

export default Sporsmalene;
