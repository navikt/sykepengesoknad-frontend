import React from 'react';
import Knapp from 'nav-frontend-knapper';
import { logger } from '../../utils/logger';
import { Soknad } from '../../types/types';
import tekster from './gjenapne-soknad-tekster';

interface GjenapneSoknadProps {
    soknad: Soknad,
    tekst?: string
}

const GjenapneSoknad = ({ soknad, tekst }: GjenapneSoknadProps) => {
    logger.info(`GjenapneSoknad-1 - sykepengesoknad.id: ${soknad.id}`);
    const gjenapner = false; // TODO: State må settes når data hentes
    const gjenapneFeilet = false; // TODO: State må settes når data hentes

    return (
        <>
            <div className={`verktoylinje ${gjenapneFeilet ? 'blokk--mini' : ''}`}>
                <div className="verktoylinje__element">
                    {
                        logger.info(`GjenapneSoknad-2 - sykepengesoknad.id: ${soknad.id}`)
                    }
                    <Knapp
                        type="standard"
                        spinner={gjenapner}
                        disabled={gjenapner}
                        mini
                        onClick={(e) => {
                            e.preventDefault();
                            // gjenapneSoknad(soknad);
                        }}
                        className="js-gjenapne">
                        {tekster['sykepengesoknad.gjenapne.knapp']}
                    </Knapp>
                </div>
            </div>
            <div aria-live="polite">
                {gjenapneFeilet && <p className="skjemaelement__feilmelding">Beklager, søknaden kunne ikke gjenåpnes</p>}
            </div>
        </>
    )
};

export default GjenapneSoknad;
