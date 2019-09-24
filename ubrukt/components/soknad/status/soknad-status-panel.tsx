import React from 'react';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { Soknad } from '../../../../src/types/types';
import { Normaltekst } from 'nav-frontend-typografi';
import parser from 'html-react-parser';
import { RSSoknadstatus } from '../../../../src/types/rs-types/rs-soknadstatus';
import Statuspanel, { StatusNokkelopplysning, Statusopplysninger } from '../../statuspanel';
import hentSoknadStatustekst from '../../../../src/utils/soknad-statustekst';
import VerktoyLinje from '../../verktoy-linje';

interface SoknadStatusPanelProps {
    soknad: Soknad,
}

const SoknadStatusPanel = ({ soknad }: SoknadStatusPanelProps) => {
    const nokkel = (soknad.sendtTilNAVDato) && soknad.sendtTilArbeidsgiverDato
        ? 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver-og-nav'
        : (soknad.sendtTilNAVDato)
            ? 'sykepengesoknad.sykepengeinfo.til-nav'
            : 'sykepengesoknad.sykepengeinfo.til-arbeidsgiver';

    return (
        <Statuspanel enKolonne>
            <Statusopplysninger>
                <StatusNokkelopplysning tittel={getLedetekst('statuspanel.status')}>
                    <Normaltekst>{hentSoknadStatustekst(soknad)}</Normaltekst>
                </StatusNokkelopplysning>
                <StatusNokkelopplysning tittel={getLedetekst('sykepengesoknad.sykepengeinfo.tittel')}>
                    <Normaltekst>{parser(getHtmlLedetekst(nokkel))}</Normaltekst>
                </StatusNokkelopplysning>
            </Statusopplysninger>
            {
                soknad.status === RSSoknadstatus.SENDT
                && <VerktoyLinje soknad={soknad}/>
            }
        </Statuspanel>);
};

export default SoknadStatusPanel;
