import React, { useEffect } from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { Sidetittel } from 'nav-frontend-typografi';
import { Brodsmule, Soknad } from '../../types/types';
import Teasere from '../../components/soknader/teaser/teasere';
import UtbetalingerLenke from '../../components/soknader/utbetalinger/utbetalinger-lenke';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../../utils/sorter-soknader';
import Vis from '../../components/vis';
import { useAppStore } from '../../data/stores/app-store';
import { RSSoknadstatus } from '../../types/rs-types/rs-soknadstatus';
import tekster from './soknader-tekster';
import Brodsmuler from '../../components/brodsmuler/brodsmuler';
import { setBodyClass } from '../../utils/utils';
import './soknader.less';

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return soknader.filter(soknad =>
        soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING
    ).sort(sorterEtterOpprettetDato);
};

const brodsmuler: Brodsmule[] = [ {
    tittel: tekster['soknader.sidetittel'],
    sti: '/soknader',
    erKlikkbar: false
} ];

const Soknader = () => {
    const { soknader } = useAppStore();
    const nyeSoknader = filtrerOgSorterNyeSoknader(soknader);

    const tidligereSoknader = soknader
        .filter((soknad) =>
            soknad.status === RSSoknadstatus.SENDT || soknad.status === RSSoknadstatus.AVBRUTT
        ).sort(sorterEtterPerioder);

    const fremtidigeSoknader = soknader
        .filter((soknad) => soknad.status === RSSoknadstatus.FREMTIDIG)
        .sort(sorterEtterPerioder)
        .reverse();

    useEffect(() => {
        setBodyClass('soknader');
    }, []);

    return (
        <div className="limit">
            <Brodsmuler brodsmuler={brodsmuler} />
            <Sidetittel tag="h1" className="sidetopp__tittel">
                {tekster['soknader.sidetittel']}
            </Sidetittel>

            <Vis hvis={false}>
                <Alertstripe type="advarsel" className="blokk">
                    <p className="sist">
                        <strong>Oops!</strong>
                        Vi kunne ikke hente alle dine sykepengesøknader.
                    </p>
                </Alertstripe>
            </Vis>

            <Teasere
                soknader={nyeSoknader}
                tittel={tekster['soknader.venter-paa-behandling.tittel']}
                tomListeTekst={tekster['soknader.venter-paa-behandling.ingen-soknader']}
                id="soknader-list-til-behandling"
            />

            <Vis hvis={fremtidigeSoknader.length > 0}>
                <Teasere
                    soknader={fremtidigeSoknader}
                    tittel={tekster['soknader.planlagt.tittel']}
                    id="soknader-planlagt"
                />
            </Vis>

            <UtbetalingerLenke />

            <Vis hvis={tidligereSoknader.length > 0}>
                <Teasere
                    soknader={tidligereSoknader}
                    tittel={tekster['soknader.sendt.tittel']}
                    id="soknader-sendt"
                />
            </Vis>
        </div>
    );
};

export default Soknader;
