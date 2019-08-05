import * as React from 'react';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule, Soknad } from '../../types/types';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Sidetittel } from 'nav-frontend-typografi';
import { getLedetekst, tilLesbarPeriodeMedArstall } from '@navikt/digisyfo-npm';

import './banner.less';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';

interface BannerProps {
    soknad: Soknad,
    brodsmuler: Brodsmule[],
}

const Banner = ({ soknad, brodsmuler }: BannerProps) => {
    const tittel = soknad && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        ? getLedetekst('sykepengesoknad-utland.tittel')
        : getLedetekst('sykepengesoknad.sidetittel');

    return <header className="soknadtopp">
        <div className="begrensning begrensning--soknad soknadtopp__brodsmuler">
            <Brodsmuler brodsmuler={brodsmuler}/>
        </div>
        <Sidetittel tag="h1" className="soknadtopp__tittel">{tittel}</Sidetittel>
        {
            <div className="soknadtopp__meta begrensning begrensning--soknad">
                <p>
                    {
                        getLedetekst('sykepengesoknad.sidetittel.periode-2', {
                            '%PERIODE%': tilLesbarPeriodeMedArstall(soknad.fom, soknad.tom),
                        })
                    }
                </p>
                <Hjelpetekst id="oppdelt-soknad-hjelpetekst">
                    {getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')}
                </Hjelpetekst>
            </div>
        }
    </header>;
};

export default Banner
