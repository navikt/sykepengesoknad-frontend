import React, { useEffect, useRef } from 'react';
import Vis from '../../vis';
import { erSynligIViewport, getTop } from '../../../utils/browser-utils';
import './feil-oppsummering.less';
import { Feiloppsummering } from 'nav-frontend-skjema';

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
    const feilmeldinger = Object.entries(props.errors).map((error: any) => {
        return {
            skjemaelementId: error[0],
            feilmelding: error[1]['message']
        };
    });

    useEffect(() => {
        const { settFokus } = props;
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
                <Feiloppsummering tittel={'Det er ' + feilmeldinger.length + ' feil i skjemaet'} feil={feilmeldinger}/>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
