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
