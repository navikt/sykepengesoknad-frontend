import cn from 'classnames';
import React, { useState } from 'react';
import { Soknad } from '../../src/types/types';
import { RSSoknadstatus } from '../../src/types/rs-types/rs-soknadstatus';
import { RSSoknadstype } from '../../src/types/rs-types/rs-soknadstype';
import EndreSoknad from './soknad/endre/endre-soknad';

interface VerktoyLinjeProps {
    soknad: Soknad,
}

// TODO: Ta inn Ettersening fra gammel løsning

const VerktoyLinje = ({ soknad }: VerktoyLinjeProps) => {
    const [endringFeilet] = useState(false);

    const feilmelding = endringFeilet
        ? 'Beklager, søknaden kunne ikke endres'
        : null;

    const verktoylinjeClassName = cn('verktoylinje', {
        'blokk--mini': feilmelding,
    });

    return (
        <>
            <div className={verktoylinjeClassName}>
                <EndreSoknad soknad={soknad} />
{/*
                <ConnectedEttersending
                    manglendeDato="sendtTilNAVDato"
                    ledetekstKeySuffix="send-til-nav"
                    sykepengesoknad={soknad}
                />
                <ConnectedEttersending
                    manglendeDato="sendtTilArbeidsgiverDato"
                    ledetekstKeySuffix="send-til-arbeidsgiver"
                    sykepengesoknad={soknad}
                />
*/}
            </div>
            <div aria-live="polite">
                {
                    feilmelding &&
                    <p className="skjemaelement__feilmelding">{feilmelding}</p>
                }
            </div>
        </>
    )
};

const visEttersending = (soknad: Soknad) => {
    return soknad.soknadstype === RSSoknadstype.ARBEIDSTAKERE
        && soknad.status === RSSoknadstatus.SENDT
        && !(soknad.sendtTilNAVDato && soknad.sendtTilArbeidsgiverDato);
};

/*
const mapStateToProps = (state, ownProps) => {
    return {
        vis: visEndringSelector(state, ownProps.soknad) || visEttersending(ownProps.soknad),
        feilmelding: state.soknader.endringFeilet
            ? 'Beklager, søknaden kunne ikke endres'
            : null,
    };
};
*/

export default VerktoyLinje;
