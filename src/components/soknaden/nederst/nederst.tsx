import React, { useState } from 'react';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';
import tekster from './nederst-tekster';
import './nederst.less';
import Vis from '../../../utils/vis';

const Nederst = () => {
    const [bekreft, setBekreft] = useState<boolean>(true);

    const confirmChanged = () => {
        setBekreft(!bekreft);
    };

    return (
        <div className="nederst">
            <div className="foer-du-begynner">
                <Systemtittel tag="h3" className="foer-du-begynner-tittel">{tekster['sykepengesoknad.foer-du-begynner.tittel']}</Systemtittel>
                <Normaltekst>{tekster['sykepengesoknad.for-du-begynner.introtekst']}</Normaltekst>
            </div>

            <BekreftCheckboksPanel onChange={confirmChanged} checked={bekreft} label={tekster['sykepengesoknad.bekreft-ansvar.label']}/>
            <Vis hvis={!bekreft}>
                <Normaltekst className="skjema-feilmelding" aria-live="polite">
                    {tekster['soknad.feilmelding.ansvarserklaring']}
                </Normaltekst>
            </Vis>

            <div className="knapperad">
                <Knapp type="hoved">{tekster['sykepengesoknad.ga-videre']}</Knapp>
                <Lenke href={'asdf'}>
                    <Normaltekst>{tekster['sykepengesoknad.avbryt.trigger']}</Normaltekst>
                </Lenke>
            </div>
        </div>
    );
};

export default Nederst;
