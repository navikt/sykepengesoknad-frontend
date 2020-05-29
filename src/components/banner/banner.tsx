import React from 'react';
import { Systemtittel } from 'nav-frontend-typografi';
import { RSSoknadstype } from '../../types/rs-types/rs-soknadstype';
import { useAppStore } from '../../data/stores/app-store';
import { useHistory } from 'react-router';
import './banner.less';
import SykSokLokalt from '../brodsmuler/syk-sok-lokalt';
import { tekst } from '../../utils/tekster';

const Banner = () => {
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
            <SykSokLokalt />
            <Systemtittel tag='h1' className='soknadtopp__tittel'>{tittel}</Systemtittel>
        </header>
    );
};

export default Banner
