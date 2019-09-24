import React, { useEffect } from 'react';
import { erSynligIViewport, getHtmlLedetekst, getLedetekst, scrollTo } from '@navikt/digisyfo-npm';
import { Soknad } from '../../../src/types/types';
import Sidetopp from '../../../src/components/sidetopp';
import { getSendtTilSuffix } from '../../../src/utils/soknad-utils';
import IllustrertInnholdGronnHake from './illustrert-innhold-gronn-hake';
import { Link } from 'react-router-dom';

interface KvitteringProps {
    soknad: Soknad,
}

const KvitteringArbeidstakere = ({ soknad }: KvitteringProps) => {
    let kvittering: HTMLDivElement | null;

    useEffect(() => {
        const el = kvittering;
        if (!erSynligIViewport(el)) {
            scrollTo(el, 200);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (<div ref={(c) => {
            kvittering = c;
        }}>
            <Sidetopp tittel="Kvittering"/>
            <div className="panel js-kvittering blokk">
                <IllustrertInnholdGronnHake>
                    <h2 className="panel__tittel">{getLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(soknad)}.tittel`)}</h2>
                    <div
                        className="redaksjonelt-innhold"
                        dangerouslySetInnerHTML={getHtmlLedetekst(`sykepengesoknad.kvittering${getSendtTilSuffix(soknad)}.tekst`, {
                            '%ARBEIDSGIVER%': soknad.arbeidsgiver ? soknad.arbeidsgiver.navn : '',
                        })}
                    />
                </IllustrertInnholdGronnHake>
            </div>
            <p className="ikke-print blokk navigasjonsstripe">
                <Link to={'/soknader'} className="tilbakelenke">
                    {getLedetekst('sykepengesoknad.navigasjon.gaa-til')}
                </Link>
            </p>
        </div>
    )
};

export default KvitteringArbeidstakere;
