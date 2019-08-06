import React from 'react';
import Alertstripe from 'nav-frontend-alertstriper';
import { getLedetekst, sykepengesoknadstatuser } from '@navikt/digisyfo-npm';
import { Soknad } from '../types/types';
import Sidetopp from '../components/sidetopp';
import SoknaderTeasere from './soknader-teasere';
import UtbetalingerLenke from '../components/utbetalinger/utbetalinger-lenke';
import { sorterEtterOpprettetDato, sorterEtterPerioder } from '../utils/sorter-soknader';

interface SoknaderProps {
    soknader: Soknad[],
    visFeil: boolean
}

const { SENDT, TIL_SENDING, UTGAATT, NY, UTKAST_TIL_KORRIGERING, FREMTIDIG, AVBRUTT } = sykepengesoknadstatuser;

export const filtrerOgSorterNyeSoknader = (soknader: Soknad[]) => {
    return [...soknader].filter((soknad) => {
        return soknad.status === NY || soknad.status === UTKAST_TIL_KORRIGERING;
    }).sort(sorterEtterOpprettetDato);
};

const Soknader = ({ soknader, visFeil }: SoknaderProps) => {
    const nyeSoknader = filtrerOgSorterNyeSoknader([...soknader]);
    const tidligereSoknader = [...soknader]
        .filter((soknad) => {
            return soknad.status === SENDT || soknad.status === TIL_SENDING || soknad.status === UTGAATT || soknad.status === AVBRUTT;
        })
        .sort(sorterEtterPerioder);
    const fremtidigeSoknader = [...soknader]
        .filter((soknad) => {
            return soknad.status === FREMTIDIG;
        })
        .sort(sorterEtterPerioder)
        .reverse();

    return (
        <>
            <Sidetopp tittel={getLedetekst('soknader.sidetittel')}/>
            {visFeil ?
                <Alertstripe type="advarsel" className="blokk">
                    <p className="sist">
                        <strong>Oops!</strong>
                        Vi kunne ikke hente alle dine sykepengesøknader.
                    </p>
                </Alertstripe>
                : null
            }
            <SoknaderTeasere
                soknader={nyeSoknader}
                tittel={getLedetekst('soknader.venter-paa-behandling.tittel')}
                tomListeTekst={getLedetekst('soknader.venter-paa-behandling.ingen-soknader')}
                className="js-til-behandling"
                id="soknader-list-til-behandling"
            />
            {
                fremtidigeSoknader.length > 0 &&
                <SoknaderTeasere
                    // Child={FremtidigSoknadTeaser} TODO: Hvordan hente inn udefinert Child?
                    soknader={fremtidigeSoknader}
                    tittel={getLedetekst('soknader.planlagt.tittel')}
                    className="js-planlagt"
                    id="soknader-planlagt"
                />
            }
            <UtbetalingerLenke/>
            {
                tidligereSoknader.length > 0 && (
                    <SoknaderTeasere
                        soknader={tidligereSoknader}
                        tittel={getLedetekst('soknader.sendt.tittel')}
                        className="js-sendt"
                        id="soknader-sendt"
                    />
                )
            }
        </>
    );
};

export default Soknader;
