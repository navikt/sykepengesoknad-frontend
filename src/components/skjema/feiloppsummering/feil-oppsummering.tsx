import React, { useEffect, useRef } from 'react';
import Vis from '../../vis';
import { erSynligIViewport, getTop } from '../../../utils/browser-utils';
import { Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import './feil-oppsummering.less';

interface FeiloppsummeringProps {
    settFokus?: boolean;
    errors: any;
}

const FeilOppsummering = (props: FeiloppsummeringProps) => {
    const oppsummering = useRef<HTMLDivElement>(null);
    const { settFokus, errors } = props;
    const entries: any[] = Object.entries(errors);

    useEffect(() => {
        let fokuser = settFokus;
        if (fokuser === undefined) {
            fokuser = true;
        }
        if (fokuser && oppsummering.current) {
            if (!erSynligIViewport(oppsummering.current)) {
                const end = getTop(oppsummering.current, 600);
                window.scrollTo(end, 300);
                setTimeout(() => {
                    fokuserOppsummering();
                }, 300);
            } else {
                fokuserOppsummering();
            }
        }
    });

    function fokuserOppsummering() {
        oppsummering.current.focus();
    }

    return (
        <div aria-live="polite" role="alert">
            <Vis hvis={entries.length > 0}>
                <div tabIndex={0} role="region" className="feiloppsummering">
                    <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
                    <ul className="feiloppsummering__liste">
                        {entries.map((list, index) => (
                            <li key={index}>
                                <Lenke href={`#${list[0]}`}>{list[1].message}</Lenke>
                            </li>
                        ))}
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
