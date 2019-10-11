import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule, Soknad } from '../../types/types';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import './banner.less';
import tekster from './banner-tekster';

interface BannerProps {
    soknad: Soknad;
    brodsmuler: Brodsmule[];
}

const Banner = ({ soknad, brodsmuler }: BannerProps) => {
    const tittel = soknad && soknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        ? tekster['sykepengesoknad-utland.tittel']
        : tekster['sykepengesoknad.sidetittel'];

    return (
        <header className="soknadtopp">
            <Brodsmuler brodsmuler={brodsmuler}/>
            <Sidetittel tag="h1" className="soknadtopp__tittel">{tittel}</Sidetittel>
        </header>
    );
};

export default Banner
