import React, { useEffect, useRef } from 'react';
import Vis from '../../vis';
import { erSynligIViewport } from '../../../utils/browser-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { SpmProps } from '../../sporsmal/sporsmal-form/sporsmal-form';
import { flattenSporsmal } from '../../../utils/soknad-utils';
import { Sporsmal } from '../../../types/types';
import './feil-oppsummering.less';

interface FeiloppsummeringProps {
    settFokus?: boolean;
    errors: any;
}

type FeilProps = FeiloppsummeringProps & SpmProps;

const FeilOppsummering = (props: FeilProps) => {
    const oppsummering = useRef<HTMLDivElement>(null);
    const { settFokus, errors, sporsmal } = props;
    const entries: any[] = Object.entries(errors);

    useEffect(() => {
        let fokuser = settFokus;
        if (fokuser === undefined) {
            fokuser = true;
        }
        if (fokuser && oppsummering.current) {
            if (!erSynligIViewport(oppsummering.current)) {
                setTimeout(() => {
                    oppsummering.current?.focus();
                }, 300);
            } else {
                oppsummering.current?.focus();
            }
        }
    });

    const handleClick = (list: any) => {
        const id = `${list[0]}`;
        const idarr = id.split('_');

        let detteSpm = flattenSporsmal(sporsmal.undersporsmal).filter((uspm: Sporsmal) => uspm.id === idarr[0])[0];
        if (!detteSpm) {
            detteSpm = sporsmal;
        }

        let elmid;
        if (id.includes('_')) {
            elmid = idarr[0] + '_t_' + idarr[1];

        } else if (detteSpm.svartype.includes('JA_NEI')) {
            elmid = idarr[0] += '_0';

        } else if (detteSpm.svartype.includes('CHECK') || detteSpm.svartype.includes('RADIO') ||
            detteSpm.svartype.includes('TIMER') || detteSpm.svartype.includes('PROSENT')) {
            elmid = idarr[0];

        } else if (detteSpm.svartype.includes('DATO')) {
            elmid = 'input' + idarr[0];
        }

        const element = document.getElementById(elmid);
        if (element) {
            if (detteSpm.erHovedsporsmal && detteSpm.svartype.includes('JA_NEI')) {
                element!.parentElement.classList.add('inputPanel--focused');
            }
            element.focus();
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div aria-live='polite' role='alert'>
            <Vis hvis={entries.length > 0}>
                <div ref={oppsummering} tabIndex={0} role='region' className='feiloppsummering'>
                    <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
                    <ul className='feiloppsummering__liste'>
                        {entries.sort(list => list[0][0]).map((list, index) => (
                            <li key={index}>
                                <div role='link' className='lenke' onClick={() => handleClick(list)}>{list[1].message}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
