import React, { useEffect } from 'react';
import tekster from './opplysninger-tekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SykmeldingPerioder from './sykmelding-perioder';
import { useAppStore } from '../../../data/stores/app-store';
import ArbeidsgiverInfo from './arbeidsgiver-info';
import './opplysninger.less';
import SykmeldingDato from './sykmelding-dato';
import SelvstendigInfo from './selvstendig-info';

const Opplysninger = () => {
    const { soknad, sykmeldinger, setSykmelding } = useAppStore();

    useEffect(() => {
        const melding = sykmeldinger.filter(sm => sm.id === soknad.sykmeldingId)[0];
        setSykmelding(melding);

        // eslint-disable-next-line
    }, [sykmeldinger]);

    return (
        <Ekspanderbartpanel tittel={tekster['sykmelding-utdrag.tittel']} tittelProps="element">
            <div className="opplysninger">
                <SykmeldingPerioder/>
                <ArbeidsgiverInfo/>
                <SykmeldingDato/>
                <SelvstendigInfo/>
            </div>
        </Ekspanderbartpanel>
    )
};

export default Opplysninger;
