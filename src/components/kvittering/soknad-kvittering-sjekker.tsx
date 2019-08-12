import * as React from 'react';
import { getLedetekst } from '@navikt/digisyfo-npm';
import { Link } from 'react-router-dom';
import { Soknad } from '../../types/types';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Sidetopp from '../sidetopp';
import Feilmelding from '../feilmelding';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import KvitteringSelvstendige from './kvittering-selvstendige';
import KvitteringArbeidstakere from './kvittering-arbeidstakersoknad';

interface SoknadKvitteringSjekkerProps {
    soknad: Soknad,
}

const SoknadKvitteringSjekker = ({ soknad }: SoknadKvitteringSjekkerProps) => {
    switch (soknad.status) {
        case RSSoknadstatus.NY:
        case RSSoknadstatus.UTKAST_TIL_KORRIGERING: {
            return (
                <>
                    <Sidetopp tittel={getLedetekst('sykepengesoknad.sidetittel')}/>
                    <Feilmelding tittel={getLedetekst('soknad.kvittering.ugyldig.ny.tittel')}>
                        <span>
                            {getLedetekst('soknad.kvittering.ugyldig.ny.melding')}
                            <Link className="lenke"
                                to={`/soknader/${soknad.id}`}>
                                {getLedetekst('soknad.kvittering.ugyldig.ny.lenke')}
                            </Link>
                        </span>
                    </Feilmelding>
                </>
            );
        }
        case RSSoknadstatus.KORRIGERT:
        case RSSoknadstatus.SENDT: {
            return soknad.soknadstype === RSSoknadstype.SELVSTENDIGE_OG_FRILANSERE
                ? <KvitteringSelvstendige/>
                : <KvitteringArbeidstakere soknad={soknad}/>;
        }
        default: {
            return <Feilmelding melding="feil status"/>;
        }
    }
};

export default SoknadKvitteringSjekker;

