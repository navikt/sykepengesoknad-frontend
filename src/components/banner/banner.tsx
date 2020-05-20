import React from 'react';
import { Sidetittel } from 'nav-frontend-typografi';
import Brodsmuler from '../brodsmuler/brodsmuler';
import { Brodsmule } from '../../types/types';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import { useAppStore } from '../../data/stores/app-store';
import { useHistory } from 'react-router';
import './banner.less';
import SykSokLokalt from '../brodsmuler/syk-sok-lokalt';
import { tekst } from '../../utils/tekster';

interface BannerProps {
    brodsmuler: Brodsmule[];
}

const Banner = ({ brodsmuler }: BannerProps) => {
    const { valgtSoknad } = useAppStore();
    const history = useHistory();

    let tittel = valgtSoknad && valgtSoknad.soknadstype === RSSoknadstype.OPPHOLD_UTLAND
        ? tekst('sykepengesoknad-utland.tittel')
        : tekst('sykepengesoknad.sidetittel');

    if (history.location.pathname.includes('kvittering')) {
        tittel = tekst('kvittering.sidetittel')
    }

    return (
        <header className='soknadtopp'>
            <Brodsmuler brodsmuler={brodsmuler} />
            <SykSokLokalt />
            <Sidetittel tag='h1' className='soknadtopp__tittel'>{tittel}</Sidetittel>
        </header>
    );
};

export default Banner
