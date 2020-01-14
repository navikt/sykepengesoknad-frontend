import React, { useEffect, useRef } from 'react';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import Vis from '../../vis';
import { erSynligIViewport, getTop } from '../../../utils/browser-utils';
import './feil-oppsummering.less';

interface FeiloppsummeringProps {
    settFokus?: boolean;
    skjemanavn?: string;
    visFeilliste: boolean;
    errors: any;
/*
    errors?: {
        felt: {
            navn: {
                type: string;
                message: string;
                ref: HTMLInputElement;
            };
        };
    };
*/
}

const FeilOppsummering = (props: FeiloppsummeringProps) => {
    const oppsummering = useRef<HTMLDivElement>(null);
    const feilmeldinger = Object.entries(props.errors);

    useEffect(() => {
        const {settFokus} = props;
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
            <Vis hvis={feilmeldinger.length > 0 && props.visFeilliste}>
                <div className="feiloppsummering"
                    ref={oppsummering}
                    tabIndex={-1}>
                    <Undertittel tag="h3" className="feiloppsummering__tittel">
                        Det er {feilmeldinger.length} feil i skjemaet
                    </Undertittel>
                    <ul className="feiloppsummering__liste">
                        <Vis hvis={feilmeldinger.length > 0}>
                            {feilmeldinger.map((felt: any, index: number) => {
                                return (
                                    <li className="feiloppsummering__feil" key={index}>
                                        <Lenke href={`#${felt[0]}`}>
                                            <Normaltekst tag="span">{felt[1].message}</Normaltekst>
                                        </Lenke>
                                    </li>
                                );
                            })}
                        </Vis>
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
