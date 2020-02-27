import React, { useEffect, useRef } from 'react';
import Vis from '../../vis';
import { erSynligIViewport } from '../../../utils/browser-utils';
import { Undertittel } from 'nav-frontend-typografi';
import { HashLink } from 'react-router-hash-link';
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
                setTimeout(() => {
                    oppsummering.current?.focus();
                }, 300);
            } else {
                oppsummering.current?.focus();
            }
        }
    });

    return (
        <div aria-live="polite" role="alert">
            <Vis hvis={entries.length > 0}>
                <div ref={oppsummering} tabIndex={0} role="region" className="feiloppsummering">
                    <Undertittel>{'Det er ' + entries.length + ' feil i skjemaet'}</Undertittel>
                    <ul className="feiloppsummering__liste">
                        {entries.sort(list => list[0][0]).map((list, index) => (
                            <li key={index}>
                                <HashLink smooth to={`#${list[0]}`}>{list[1].message}</HashLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
