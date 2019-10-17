import React from 'react';
import { Sporsmal } from '../../types/types';
import { RSSvartype } from '../../types/rs-types/rs-svartype';
import UndersporsmalListe from './undersporsmal-liste';
import Dato from './dato';
import Tall from './tall';
import tekster from './sporsmal-tekster';
import CheckboxComp from './checkbox-comp';
import { useAppStore } from '../../data/stores/app-store';

interface SporsmalProps {
    sporsmal?: Sporsmal,
    name: string,
}

const SporsmalComponent = ({ sporsmal, name }: SporsmalProps) => {
    const { valgtSoknad } = useAppStore();

    if (!sporsmal || !name) {
        return null;
    }
    const undersporsmalsliste = <UndersporsmalListe undersporsmal={sporsmal.undersporsmal} />;

    switch (sporsmal.svartype) {
        case RSSvartype.DATO: {
            return (
                <Dato {...sporsmal} name={name} min={valgtSoknad.fom} max={valgtSoknad.tom}>
                    {undersporsmalsliste}
                </Dato>
            );
        }
        case RSSvartype.TIMER: {
            return (
                <Tall {...sporsmal} name={name} label={tekster['soknad.timer-totalt']} kunHeltall={false}>
                    {undersporsmalsliste}
                </Tall>
            );
        }
        case RSSvartype.PROSENT: {
            return (
                <Tall {...sporsmal} name={name} label={tekster['soknad.prosent']} kunHeltall={true}>
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
                <CheckboxComp {...sporsmal} name={name} soknad={valgtSoknad}>
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
