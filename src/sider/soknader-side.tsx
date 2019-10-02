import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { Soknad } from '../types/types';
import Sidetopp from '../components/sidetopp';
import SoknaderTeasere from '../components/soknad/teaser/soknader-teasere';
import UtbetalingerLenke from '../components/utbetalinger/utbetalinger-lenke';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../utils/sorter-soknader';
import Vis from '../utils/vis';
import { useAppStore } from '../stores/app-store';
import { RSSoknadstatus } from '../types/rs-types/rs-soknadstatus';
import tekster from './soknader-side-tekster';

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return soknader.filter((soknad) => {
        return soknad.status === RSSoknadstatus.NY || soknad.status === RSSoknadstatus.UTKAST_TIL_KORRIGERING;
    }).sort(sorterEtterOpprettetDato);
};

const SoknaderSide = () => {
    const { soknader, visFeil } = useAppStore();

    const nyeSoknader = filtrerOgSorterNyeSoknader(soknader);
    const tidligereSoknader = soknader
        .filter((soknad) => {
            return soknad.status === RSSoknadstatus.SENDT || soknad.status === RSSoknadstatus.AVBRUTT;
        })
        .sort(sorterEtterPerioder);
    const fremtidigeSoknader = soknader
        .filter((soknad) => {
            return soknad.status === RSSoknadstatus.FREMTIDIG;
        })
        .sort(sorterEtterPerioder)
        .reverse();

    return (
        <div className="limit">
            <Sidetopp tittel={tekster['soknader.sidetittel']}/>

            <Vis hvis={visFeil}>
                <Alertstripe type="advarsel" className="blokk">
                    <p className="sist">
                        <strong>Oops!</strong>
                        Vi kunne ikke hente alle dine sykepengesøknader.
                    </p>
                </Alertstripe>
            </Vis>

            <SoknaderTeasere
                soknader={nyeSoknader}
                tittel={tekster['soknader.venter-paa-behandling.tittel']}
                tomListeTekst={tekster['soknader.venter-paa-behandling.ingen-soknader']}
                className="js-til-behandling"
                id="soknader-list-til-behandling"
            />

            <Vis hvis={fremtidigeSoknader.length > 0}>
                <SoknaderTeasere
                    // Child={FremtidigSoknadTeaser} TODO: Hvordan hente inn udefinert Child?
                    soknader={fremtidigeSoknader}
                    tittel={tekster['soknader.planlagt.tittel']}
                    className="js-planlagt"
                    id="soknader-planlagt"
                />
            </Vis>

            <UtbetalingerLenke/>

            <Vis hvis={tidligereSoknader.length > 0}>
                <SoknaderTeasere
                    soknader={tidligereSoknader}
                    tittel={tekster['soknader.sendt.tittel']}
                    className="js-sendt"
                    id="soknader-sendt"
                />
            </Vis>
        </div>
    );
};

export default SoknaderSide;
