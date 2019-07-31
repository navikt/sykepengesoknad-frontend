import * as React from 'react';
import { Soknad } from '../types/types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Systemtittel } from 'nav-frontend-typografi';
import { getLedetekst, tilLesbarPeriodeMedArstall } from "@navikt/digisyfo-npm";

interface SoknadHeaderProps {
    soknad: Soknad
}

const SoknadHeader = ({soknad}: SoknadHeaderProps) => {
    return (
        <header className="sidetopp">
            <Systemtittel tag="h1" className="sidetopp__tittel">
                {getLedetekst('sykepengesoknad.sidetittel')}
            </Systemtittel>
            <div className="medHjelpetekst sidetopp__meta">
                <p>{
                    getLedetekst('sykepengesoknad.sidetittel.periode-2', {
                        '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                    })
                }</p>
                <Hjelpetekst id="oppdelt-soknad-hjelpetekst">
                    {getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')}
                </Hjelpetekst>
            </div>
        </header>
    )
};

export default SoknadHeader;
