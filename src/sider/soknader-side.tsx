import * as React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { useAppStore } from '../stores/app-store';

const SoknaderSide = () => {
    const { soknader } = useAppStore();
    return (
        <>
            <h1>{getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')}</h1>
            {
                soknader.map(soknad => {
                    return (
                        <div>{soknad.sporsmal[0].id}</div>
                    )
                })
            }
        </>
    )
};

export default SoknaderSide;
