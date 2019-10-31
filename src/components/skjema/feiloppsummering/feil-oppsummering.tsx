import React, { useEffect, useRef } from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import Vis from '../../../../src/utils/vis';
import { erSynligIViewport, getTop } from '../../../utils/browser-utils';
import './feil-oppsummering.less';

interface FeillisteMelding {
    feltnavn: string;
    feilmelding: string;
}

const FeillisteMelding = ({feltnavn, feilmelding}: FeillisteMelding) => {
    return (
        <li className="feiloppsummering__feil">
            <a href={`#${feltnavn}`}>{feilmelding}</a>
        </li>
    );
};

interface FeiloppsummeringProps {
    settFokus?: boolean;
    skjemanavn?: string;
    visFeilliste: boolean;
    errors?: {};
/*
    errors?: {
        felt: string;
        melding: {
            prop: string;
            mess: string;
        };
    };
*/
}

const FeilOppsummering = (props: FeiloppsummeringProps) => {
    const oppsummering = useRef<HTMLDivElement>(null);
    console.log('props.errors', props.errors); // eslint-disable-line

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

    const feilmeldinger = Object.entries(props.errors);
    console.log('feilmeldinger', feilmeldinger); // eslint-disable-line
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
                                return <FeillisteMelding key={index} feltnavn={felt} feilmelding={felt} />;
                            })}
                        </Vis>
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
