import React from 'react';
import cls from 'classnames';
import { useParams, useHistory } from 'react-router';
import Vis from '../../vis';
import { pathUtenSteg } from '../sporsmal-utils';
import { SEPARATOR } from '../../../utils/constants';
import { useAmplitudeInstance } from '../../amplitude/amplitude';
import { useAppStore } from '../../../data/stores/app-store';

const innerCls = (aktiv: boolean, ferdig: boolean, disabled: boolean) =>
    cls('stegindikator__steg-inner', {
        'stegindikator__steg-inner--aktiv': aktiv,
        'stegindikator__steg-inner--ferdig': ferdig,
        'stegindikator__steg-inner--disabled': disabled,
        'stegindikator__steg-inner--interaktiv': !aktiv
    });

export interface StegProps {
    label: string;
    index: number;
}

const Steg = ({ label, index }: StegProps) => {
    const { stegId } = useParams();
    const { valgtSoknad } = useAppStore();
    const { logEvent } = useAmplitudeInstance();
    const aktivtSteg = parseInt(stegId);
    const num = index + 1;
    const erAktiv = aktivtSteg === num;
    const erPassert = aktivtSteg > num;
    const disabled = !erPassert && !erAktiv;
    const history = useHistory();

    function goTo(idx: number) {
        logEvent('Trykt på spørsmålssteg', { fra: valgtSoknad.sporsmal[aktivtSteg - 1].tag, til: valgtSoknad.sporsmal[idx - 1].tag });
        history.push(pathUtenSteg(history.location.pathname) + SEPARATOR + (idx));
    }

    return (
        <li className='stegindikator__steg' aria-current={(erAktiv) ? 'step' : undefined}>
            <Vis hvis={aktivtSteg >= index + 2}>
                <button className={innerCls(erAktiv, erPassert, disabled)} title={label} disabled={disabled} onClick={() => goTo(num)}>
                    <div className='stegindikator__steg-num'>{num}</div>
                </button>
            </Vis>

            <Vis hvis={aktivtSteg < index + 2}>
                <div className={innerCls(erAktiv, erPassert, disabled)} title={label} >
                    <div className='stegindikator__steg-num'>{num}</div>
                </div>
            </Vis>
        </li>
    );
};

export default Steg;
