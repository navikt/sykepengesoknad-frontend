import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import { Soknad } from '../types/types';
import { logger } from '../utils/logger';
import { getUrlTilSoknad } from '../utils/url-utils';

interface StartIgjenProps {
    soknad: Soknad;
}

// TODO: Skal denne brukes, eller kan den fjernes?

const StartIgjen = ({ soknad }: StartIgjenProps) => {

    useEffect(() => {
        const type = soknad.soknadstype ? soknad.soknadstype : 'ARBEIDSTAKER_GAMMEL_PLATTFORM';
        const sporsmalsliste = soknad.soknadstype ? JSON.stringify(soknad.sporsmal) : null;
        logger.error({
            message: `Ugyldig tilstand i søknad av typen ${type} med ID: ${soknad.id}`,
            sporsmalsliste,
        });
    }, []);

    return (
        <Panel>
            <div className='hode hode--informasjon'>
                <Sidetittel tag='h2' className='hode__tittel'>Oops, nå har vi mistet dataene dine</Sidetittel>
                <Normaltekst className='hode__melding'>
                    Derfor må du dessverre
                    <Link className='lenke' to={getUrlTilSoknad(soknad, undefined)}>
                        fylle ut søknaden på nytt
                    </Link>.
                </Normaltekst>
            </div>
        </Panel>
    );
};

export default StartIgjen;
