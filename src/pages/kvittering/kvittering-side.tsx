import React, { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import { VenstreChevron } from 'nav-frontend-chevron';
import { Brodsmule } from '../../types/types';
import { SEPARATOR } from '../../utils/constants';
import { setBodyClass } from '../../utils/utils';
import { useAppStore } from '../../data/stores/app-store';
import Vis from '../../components/vis';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import { Normaltekst } from 'nav-frontend-typografi';
import { Link } from 'react-router-dom';
import { tekst } from '../../utils/tekster';
import Kvittering from '../../components/kvittering/kvittering';
import './kvittering.less';

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
    const erSiste = valgtSoknad!.status === RSSoknadstatus.SENDT;

    useEffect(() => {
        setBodyClass('kvittering');
    }, [ valgtSoknad ]);

    return (
        <div className="limit">
            <Banner brodsmuler={brodsmuler} />
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
    )
};

export default KvitteringSide;
