import * as React from 'react';
import { getLedetekst, Utvidbar } from '@navikt/digisyfo-npm';

/*
import SoknadHeader from '../felleskomponenter/SoknadHeader';
import SykepengesoknadStatuspanel from '../felleskomponenter/statuspanel/SykepengesoknadStatuspanel';
import { KORRIGERT, SENDT } from '../enums/soknadstatuser';
import RelaterteSoknaderContainer from '../felleskomponenter/relaterte-soknader/RelaterteSoknaderContainer';
import KorrigertAvContainer from '../../sykepengesoknad-gammel-plattform/soknad/soknad-sendt/KorrigertAvContainer';
import { settErOppdelt } from '../utils/settErOppdelt';
*/
import { Soknad, Sykmelding } from '../types/types';

interface SendtSoknadArbeidstakerProps {
    sykmelding: Sykmelding,
    soknad: Soknad,
}

const SendtSoknadArbeidstaker = ({ sykmelding, soknad }: SendtSoknadArbeidstakerProps) => {
//    const { _erOppdelt } = settErOppdelt(soknad, sykmelding);
    return (<div>
{/*
        <SoknadHeader soknad={soknad} />
        { soknad.status === KORRIGERT && <KorrigertAvContainer sykepengesoknad={soknad} /> }
        <SykepengesoknadStatuspanel soknad={soknad} />
        {sykmelding && <SykmeldingUtdrag sykmelding={sykmelding} sykepengesoknad={{ _erOppdelt }} />}
*/}
        <Utvidbar
            tittel={getLedetekst('sykepengesoknad.oppsummering.tittel')}
            className="blokk js-soknad-oppsummering"
            erApen
        >
            <h1>OppsummeringSporsmal inn her</h1>

            {/*
            <Oppsummeringsvisning
                soknad={{
                    ...soknad,
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag !== TagTyper.VAER_KLAR_OVER_AT;
                    }),
                }}
            />
*/}
        </Utvidbar>
{/*
        <div className="panel oppsummering__vaerKlarOverAt js-vaer-klar-over-at blokk">
            <Oppsummeringsvisning
                soknad={{
                    ...soknad,
                    sporsmal: soknad.sporsmal.filter((s) => {
                        return s.tag === VAER_KLAR_OVER_AT;
                    }),
                }}
            />
        </div>
*/}
{/*
        {
            soknad.status === SENDT
            && <RelaterteSoknaderContainer soknad={soknad} />
        }
*/}
    </div>);
};

export default SendtSoknadArbeidstaker;
