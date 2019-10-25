import React, { useEffect } from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import Vis from '../../../../src/utils/vis';
import { erSynligIViewport, getTop } from '../../../utils/browser-utils';

interface FeillisteMelding {
    feltnavn: string;
    feilmelding: string;
}

const FeillisteMelding = ({ feltnavn, feilmelding }: FeillisteMelding) => {
    return (
        <li className="feiloppsummering__feil">
            <a href={`#${feltnavn}`}>{feilmelding}</a>
        </li>
    );
};

const getFeilmeldinger = (props: any) => {
    return props.feilmeldinger || [];
};

interface FeiloppsummeringProps {
    settFokus?: boolean;
    skjemanavn?: string;
    visFeilliste: boolean;
    feilmeldinger?: {
        feltnavn: string;
        feilmelding: string;
    };
}

const FeilOppsummering = (props: FeiloppsummeringProps) => {
    let oppsummering: HTMLDivElement;

    useEffect(() => {
        const { settFokus } = props;
        let fokuser = settFokus;
        if (fokuser === undefined) {
            fokuser = true;
        }
        if (fokuser && oppsummering) {
            if (!erSynligIViewport(oppsummering)) {
                const end = getTop(oppsummering, 600);
                scrollTo(end, 300);
                setTimeout(() => {
                    fokuserOppsummering();
                }, 300);
            } else {
                fokuserOppsummering();
            }
        }
    });

    function fokuserOppsummering() {
        oppsummering.focus();
    }

    const feilmeldinger = getFeilmeldinger(props);
    return (
        <div aria-live="polite" role="alert">
            <Vis hvis={feilmeldinger.length > 0 && props.visFeilliste}>
                <div className="feiloppsummering blokk"
                    ref={(c) => {
                        oppsummering = c as HTMLDivElement;
                    }}
                    tabIndex={-1}>
                    <Innholdstittel tag="h3" className="feiloppsummering__tittel">
                        Det er {feilmeldinger.length} feil i skjemaet
                    </Innholdstittel>
                    <ul className="feiloppsummering__liste">
                        {
                            feilmeldinger.map((feilmld: string, index: number) => {
                                return <FeillisteMelding key={index} feltnavn={feilmld} feilmelding={feilmld}/>;
                            })
                        }
                    </ul>
                </div>
            </Vis>
        </div>
    );
};

export default FeilOppsummering;
