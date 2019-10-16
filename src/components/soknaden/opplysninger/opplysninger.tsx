import React from 'react';
import tekster from './opplysninger-tekster';
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel';
import SykmeldingPerioder from './sykmelding-perioder';
import ArbeidsgiverInfo from './arbeidsgiver-info';
import './opplysninger.less';
import SykmeldingDato from './sykmelding-dato';
import SelvstendigInfo from './selvstendig-info';
import { useAppStore } from '../../../data/stores/app-store';
import { RSSoknadstatus } from '../../../types/rs-types/rs-soknadstatus';

const Opplysninger = () => {
    const { valgtSoknad } = useAppStore();
    const tidligere: boolean = valgtSoknad.status === RSSoknadstatus.SENDT || valgtSoknad.status === RSSoknadstatus.AVBRUTT;

    return (
        <Ekspanderbartpanel tittel={tekster['sykmelding-utdrag.tittel']} tittelProps="element" apen={!tidligere}>
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
