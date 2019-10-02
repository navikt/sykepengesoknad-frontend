import dayjs from 'dayjs';
import React from 'react';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule, Soknad } from '../../types/types';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import { getLedetekst } from '../../utils/utils';
import './banner.less';
import tekster from './banner-tekster';

interface BannerProps {
    soknad: Soknad,
    brodsmuler: Brodsmule[],
}

const Banner = ({ soknad, brodsmuler }: BannerProps) => {
    console.log('soknad', soknad); //tslint:disable-line
    const tittel = soknad && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        ? tekster['sykepengesoknad-utland.tittel']
        : tekster['sykepengesoknad.sidetittel'];

    return (
        <header className="soknadtopp">
            <div className="begrensning begrensning--soknad soknadtopp__brodsmuler">
                <Brodsmuler brodsmuler={brodsmuler}/>
            </div>
            <Sidetittel tag="h1" className="soknadtopp__tittel">{tittel}</Sidetittel>
            {
                <div className="soknadtopp__meta begrensning begrensning--soknad">
                    <Normaltekst>
                        {getLedetekst(tekster['sykepengesoknad.sidetittel.periode-2'], {
                            '%PERIODE%': dayjs(soknad.fom).format('D. MMMM YYYY') + ' - ' +
                                dayjs(soknad.tom).format('D. MMMM YYYY')
                        })}
                    </Normaltekst>
                    <Hjelpetekst id="oppdelt-soknad-hjelpetekst">
                        {tekster['sykepengesoknad.sidetittel.hjelpetekst.tekst']}
                    </Hjelpetekst>
                </div>
            }
        </header>
    );
};

export default Banner
