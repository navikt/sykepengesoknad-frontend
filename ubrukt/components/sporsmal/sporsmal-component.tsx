import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Soknad, Sporsmal } from '../../../src/types/types';
import { RSSvartype } from '../../../src/types/rs-types/rs-svartype';
import UndersporsmalListe from './undersporsmal-liste';
import Dato from './dato';
import Tall from './tall';
import CheckboxComp from './checkbox-comp';

interface SporsmalProps {
    sporsmal?: Sporsmal,
    name: string,
    hovedsporsmal?: boolean,
    ekstraProps?: {},
    actions?: {},
    soknad: Soknad,
}

const SporsmalComponent = ({ sporsmal, name, hovedsporsmal, ekstraProps, actions, soknad }: SporsmalProps) => {
    if (!sporsmal || !name) {
        return null;
    }
    const undersporsmalsliste = <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} soknad={soknad}/>;

    switch (sporsmal.svartype) {
        case RSSvartype.DATO: {
            return (
                <Dato {...sporsmal} name={name} min={soknad.fom} max={soknad.tom}>
                    {undersporsmalsliste}
                </Dato>
            );
        }
        case RSSvartype.TIMER: {
            return (
                <Tall {...sporsmal} name={name} label={getLedetekst('soknad.timer-totalt')} kunHeltall={false}>
                    {undersporsmalsliste}
                </Tall>
            );
        }
        case RSSvartype.PROSENT: {
            return (
                <Tall {...sporsmal} name={name} label={getLedetekst('soknad.prosent')} kunHeltall={true}>
                    {undersporsmalsliste}
                </Tall>
            );
        }
        case RSSvartype.TALL: {
            return (
                <Tall {...sporsmal} name={name} label={sporsmal.undertekst} kunHeltall={false}>
                    {undersporsmalsliste}
                </Tall>
            );
        }
        case RSSvartype.CHECKBOX: {
            return (
                <CheckboxComp {...sporsmal} name={name} soknad={soknad}>
                    {undersporsmalsliste}
                </CheckboxComp>
            );
        }
        case RSSvartype.PERIODER: {
            return null;
        }
        case RSSvartype.JA_NEI: {
            return null;
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
            return null;
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

export default SporsmalComponent;
