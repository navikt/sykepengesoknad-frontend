import React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import Knapperad from '../../knapperad';

const KnapperadEttSporsmalPerSide = () => {
    return (
        <Knapperad variant="knapperad--medAvbryt">
            <button type="submit" className="knapp knapp--hoved js-ga-videre">{getLedetekst('sykepengesoknad.ga-videre')}</button>
        </Knapperad>
    );
};

export default KnapperadEttSporsmalPerSide;
