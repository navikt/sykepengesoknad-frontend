import * as React from 'react';
import { getLedetekst, getHtmlLedetekst } from '@navikt/digisyfo-npm';
import { Link } from 'react-router-dom';
import Sidetopp from '../../../src/components/sidetopp';
import IllustrertInnholdGronnHake from './illustrert-innhold-gronn-hake';

const KvitteringSelvstendige = () => {
    return (
        <>
            <Sidetopp tittel={getLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.tittel')}/>
            <div className="panel">
                <IllustrertInnholdGronnHake>
                    <h2 className="panel__tittel">
                        {getLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.undertittel')}
                    </h2>
                    <div
                        className="redaksjonelt-innhold"
                        dangerouslySetInnerHTML={getHtmlLedetekst('sykepengesoknad-selvstendig.kvittering.sendt.informasjon')}/>
                </IllustrertInnholdGronnHake>
            </div>
            <p className="ikke-print blokk navigasjonsstripe">
                <Link to={'/soknader'} className="tilbakelenke">
                    {getLedetekst('sykepengesoknad.navigasjon.gaa-til')}
                </Link>
            </p>
        </>
    );
};

export default KvitteringSelvstendige;

