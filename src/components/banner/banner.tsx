import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule } from '../../types/types';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import tekster from './banner-tekster';
import { useAppStore } from '../../data/stores/app-store';
import './banner.less';

interface BannerProps {
    brodsmuler: Brodsmule[];
}

const Banner = ({ brodsmuler }: BannerProps) => {
    const { valgtSoknad } = useAppStore();
    const tittel = valgtSoknad && valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
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
