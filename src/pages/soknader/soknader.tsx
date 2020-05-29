import React, { useEffect } from 'react';
import { Brodsmule, Soknad } from '../../types/types';
import Teasere from '../../components/soknader/teaser/teasere';
import UtbetalingerLenke from '../../components/soknader/utbetalinger/utbetalinger-lenke';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sorter-soknader';
import Vis from '../../components/vis';
import { useAppStore } from '../../data/stores/app-store';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import Brodsmuler from '../../components/brodsmuler/brodsmuler';
import { setBodyClass } from '../../utils/utils';
import { tekst } from '../../utils/tekster';
import Banner from '../../components/banner/banner';
import './soknader.less';

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return soknader.filter(soknad =>
        soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
    ).sort(sorterEtterOpprettetDato);
};

const brodsmuler: Brodsmule[] = [ {
    tittel: tekst('soknader.sidetittel'),
    sti: '/soknader',
    erKlikkbar: false
} ];

const Soknader = () => {
    const { soknader } = useAppStore();
    const nyeSoknader = filtrerOgSorterNyeSoknader(soknader);

    const tidligereSoknader = soknader
        .filter((soknad) =>
            soknad.status === RSSoknadstatus.SENDT
            || soknad.status === RSSoknadstatus.AVBRUTT
            || soknad.status === RSSoknadstatus.UTGAATT
        ).sort(sorterEtterPerioder);

    const fremtidigeSoknader = soknader
        .filter((soknad) => soknad.status === RSSoknadstatus.FREMTIDIG)
        .sort(sorterEtterPerioder)
        .reverse();

    useEffect(() => {
        setBodyClass('soknader');
    }, []);

    return (
        <>
            <Banner />
            <div className='limit'>
                <Brodsmuler brodsmuler={brodsmuler} />
                <Teasere
                    className={'mb_nye_soknader'}
                    soknader={nyeSoknader}
                    tittel={tekst('soknader.venter-paa-behandling.tittel')}
                    tomListeTekst={tekst('soknader.venter-paa-behandling.ingen-soknader')}
                    id='soknader-list-til-behandling'
                />

                <Vis hvis={fremtidigeSoknader.length > 0}>
                    <Teasere
                        soknader={fremtidigeSoknader}
                        tittel={tekst('soknader.planlagt.tittel')}
                        id='soknader-planlagt'
                    />
                </Vis>

                <UtbetalingerLenke />

                <Vis hvis={tidligereSoknader.length > 0}>
                    <Teasere
                        soknader={tidligereSoknader}
                        tittel={tekst('soknader.sendt.tittel')}
                        id='soknader-sendt'
                    />
                </Vis>
            </div>
        </>
    );
};

export default Soknader;
