import './kvittering.less';

import { VenstreChevron } from 'nav-frontend-chevron';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Banner from '../../components/banner/banner';
import Brodsmuler from '../../components/brodsmuler/brodsmuler';
import Kvittering from '../../components/kvittering/kvittering';
import Vis from '../../components/vis';
import { useAppStore } from '../../data/stores/app-store';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import { Brodsmule } from '../../types/types';
import { SEPARATOR } from '../../utils/constants';
import { tekst } from '../../utils/tekster';
import { setBodyClass } from '../../utils/utils';

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekst('kvittering.sidetittel'),
    sti: null as any,
    erKlikkbar: false,
} ];

const KvitteringSide = () => {
    const { valgtSoknad } = useAppStore();
    const [ erSiste, setErSiste ] = useState<boolean>();

    useEffect(() => {
        setBodyClass('kvittering')
        setErSiste(valgtSoknad?.status === RSSoknadstatus.SENDT);
        // eslint-disable-next-line
    }, []);

    if (!valgtSoknad) return null;

    return (
        <div>
            <Banner />
            <div className="limit">
                <Brodsmuler brodsmuler={brodsmuler} />
                <Kvittering />

                <Vis hvis={erSiste}>
                    <Link to="/" className="gaa-videre">
                        <Normaltekst tag="span">
                            <VenstreChevron />
                            {tekst('sykepengesoknad.navigasjon.gaa-til')}
                        </Normaltekst>
                    </Link>
                </Vis>
            </div>
        </div>
    )
};

export default KvitteringSide;
