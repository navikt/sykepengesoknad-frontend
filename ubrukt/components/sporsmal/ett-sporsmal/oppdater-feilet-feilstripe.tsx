import React, { useEffect } from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { log, logger } from '../../../../src/utils/logger';
import { useAppStore } from '../../../../src/stores/app-store';
import { Soknad } from '../../../../src/types/types';

interface StripeProps {
    soknad: Soknad,
    oppdaterSoknadFeiletOk: () => string,
}

const OppdaterFeiletFeilstripe = (props: StripeProps) => {
    const { oppdaterFeilet } = useAppStore();
    let timeoutHandle: any;

    useEffect(() => {
        logg();
        startNedtelling();
    });

    useEffect(() => {
        window.clearTimeout(timeoutHandle);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logg() {
        const message = `Oppdatering feilet for søknad av typen ${props.soknad!.soknadstype} med ID: ${props.soknad!.id}`;
        log(message);
        logger.info({
            message,
        });
    }

    function startNedtelling() {
        timeoutHandle = window.setTimeout(() => {
            props.oppdaterSoknadFeiletOk();
        }, 4000);
    }

    return (
        oppdaterFeilet ?
            <div aria-live="polite" role="alert">
                <Alertstripe type="advarsel" className="press">
                    <p className="sist">Oi, der skjedde det en feil... Prøv igjen!</p>
                </Alertstripe>
            </div> : null
    );
};

export default OppdaterFeiletFeilstripe;
