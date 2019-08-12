import dayjs from 'dayjs';
import * as React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule, Soknad } from '../../types/types';

import { getLedetekst } from '@navikt/digisyfo-npm';
import './banner.less';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';

interface BannerProps {
    soknad: Soknad,
    brodsmuler: Brodsmule[],
}

const Banner = ({ soknad, brodsmuler }: BannerProps) => {
    console.log('soknad', soknad); //tslint:disable-line
    const tittel = soknad && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        ? getLedetekst('sykepengesoknad-utland.tittel')
        : getLedetekst('sykepengesoknad.sidetittel');

    return (
        <header className="soknadtopp">
            <div className="begrensning begrensning--soknad soknadtopp__brodsmuler">
                <Brodsmuler brodsmuler={brodsmuler}/>
            </div>
            <Sidetittel tag="h1" className="soknadtopp__tittel">{tittel}</Sidetittel>
            {
                <div className="soknadtopp__meta begrensning begrensning--soknad">
                    <Normaltekst>
                        {
                            getLedetekst('sykepengesoknad.sidetittel.periode-2', {
                                '%PERIODE%': dayjs(soknad.fom).format('D. MMMM YYYY') + ' - ' +
                                    dayjs(soknad.tom).format('D. MMMM YYYY')
                            })
                        }
                    </Normaltekst>
                    <Hjelpetekst id="oppdelt-soknad-hjelpetekst">
                        {getLedetekst('sykepengesoknad.sidetittel.hjelpetekst.tekst')}
                    </Hjelpetekst>
                </div>
            }
        </header>
    );
};

export default Banner
