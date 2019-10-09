import * as React from 'react';
import { Soknad } from '../../types/types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { getLedetekst } from '../../utils/utils';
import tekster from './soknad-header-tekster';
import { tilLesbarPeriodeMedArstall } from '../../utils/datoUtils';

interface SoknadHeaderProps {
    soknad: Soknad
}

const SoknadHeader = ({ soknad }: SoknadHeaderProps) => {
    return (
        <header className="sidetopp">
            <Systemtittel tag="h1" className="sidetopp__tittel">
                {tekster['sykepengesoknad.sidetittel']}
            </Systemtittel>
            <div className="medHjelpetekst sidetopp__meta">
                <p>
                    {getLedetekst(tekster['sykepengesoknad.sidetittel.periode-2'], {
                        '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                    })}
                </p>
                <Hjelpetekst id="oppdelt-soknad-hjelpetekst">
                    {tekster['sykepengesoknad.sidetittel.hjelpetekst.tekst']}
                </Hjelpetekst>
            </div>
        </header>
    )
};

export default SoknadHeader;
