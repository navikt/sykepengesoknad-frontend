import React, { useEffect } from 'react';
import Banner from '../../components/banner/banner';
import { Brodsmule } from '../../types/types';
import tekster from '../soknad/soknaden-tekster';
import { SEPARATOR } from '../../utils/constants';
import { setBodyClass } from '../../utils/utils';
import { useAppStore } from '../../data/stores/app-store';
import PanelBase from 'nav-frontend-paneler';
import { Innholdstittel } from 'nav-frontend-typografi';
import SendtTil from '../soknad/sendt-til';

const brodsmuler: Brodsmule[] = [ {
    tittel: tekster['soknad.sidetittel'],
    sti: SEPARATOR,
    erKlikkbar: true
}, {
    tittel: tekster['kvittering.sidetittel'],
    sti: null,
    erKlikkbar: false,
} ];

const Kvittering = () => {
    const { valgtSoknad } = useAppStore();

    useEffect(() => {
        setBodyClass('kvittering');
    }, [ valgtSoknad ]);

    return (
        <div className="limit">
            <Banner brodsmuler={brodsmuler} />
            <PanelBase border={true}>
                <SendtTil />
            </PanelBase>
        </div>
    )
};

export default Kvittering;
