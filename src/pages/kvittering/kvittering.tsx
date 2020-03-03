import React, { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Brodsmule } from '../../types/types';
import tekster from '../soknad/soknaden-tekster';
import { SEPARATOR } from '../../utils/constants';
import { setBodyClass } from '../../utils/utils';
import { useAppStore } from '../../data/stores/app-store';
import PanelBase from 'nav-frontend-paneler';
import SendtTil from '../soknad/sendt-til';
import Vis from '../../components/vis';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import './kvittering.less';

const brodsmuler: Brodsmule[] = [ {
    tittel: tekster['soknader.sidetittel'],
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekster['kvittering.sidetittel'],
    sti: null,
    erKlikkbar: false,
} ];

const Kvittering = () => {
    const { valgtSoknad } = useAppStore();
    const erSiste = valgtSoknad.status === RSSoknadstatus.SENDT;

    useEffect(() => {
        setBodyClass('kvittering');
    }, [ valgtSoknad ]);

    return (
        <div className='limit'>
            <Banner brodsmuler={brodsmuler} />
            <PanelBase border={true}>
                <SendtTil />
            </PanelBase>

            <Vis hvis={erSiste}>
                <Link to='/' className='gaa-videre'>
                    <Normaltekst tag='span'>
                        <VenstreChevron />
                        {tekster['sykepengesoknad.navigasjon.gaa-til']}
                    </Normaltekst>
                </Link>
            </Vis>
        </div>
    )
};

export default Kvittering;
